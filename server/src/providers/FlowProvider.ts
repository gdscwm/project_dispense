import {Inject, Injectable} from "@tsed/di";
import * as process from "process";
import {Logger} from "@tsed/logger";
import {BadRequest} from "@tsed/exceptions";

@Injectable()
export class FlowService {
    @Inject()
    private logger: Logger;

    private readonly endpoint = process.env['PURCHASE_FLOW_URL'] as string; // Casting verified in $onInit hook

    async $onInit(): Promise<void> {
        if (!this.endpoint) throw new Error('PURCHASE_FLOW_URL is not defined in .env file');
    }

    /**
     * Sends a request to the flow endpoint with the given body.
     * It then asynchronously polls the returned Location header until the flow is complete.
     * @param body - The body to send to the flow endpoint
     */
    async send(body: object) {
        const res = await fetch(this.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        // The location header contains the URL to poll for the flow status as it is asynchronous
        const location = res.headers.get('Location')
        if (!location) throw new Error('Location header not returned in flow response');

        // Poll the location until the flow is complete
        const result = await this.poll(location);
        this.handleFlowResult(result)
        return result;
    }


    /**
     * Continuously polls the given URL until the flow is complete. It is complete when the status is not 202.
     * @param url
     * @private
     */
    private async poll(url: string): Promise<{ status: number, message: string | null}> {
        const res = await fetch(url);

        switch (res.status) {
            case 202:
                // 202 indicates the flow was accepted and is still running
                await this.sleep(250); // Do not overload the server with requests
                return this.poll(url);
            default:
                return {
                    status: res.status,
                    message: res.headers.get('message')
                }
        }
    }

    private handleFlowResult(result: { status: number, message: string | null}) {
        switch (result.status) {
            case 200:
                this.logger.info('Flow completed with 200 status');
                return;
            default:
                this.logger.error(`Flow failed with status ${result.status} and message ${result.message}`);
                throw new BadRequest(result.message || 'Unknown error while executing flow')
        }
    }

    private sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
}