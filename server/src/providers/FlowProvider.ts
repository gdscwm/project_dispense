import {Injectable} from "@tsed/di";
import * as process from "process";

@Injectable()
export class FlowService {
    private readonly endpoint = process.env['PURCHASE_FLOW_URL'] as string; // Casting verified in $onInit hook

    async $onInit(): Promise<void> {
        if (!this.endpoint) throw new Error('PURCHASE_FLOW_URL is not defined in .env file');
    }

    async send() {
        return "Hello World!"
    }
}