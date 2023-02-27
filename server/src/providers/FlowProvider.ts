import {Injectable} from "@tsed/di";

@Injectable()
export class FlowService {
    private readonly endpoint: string = "https://api.flow.ai/v1";

    async send() {
        return "Hello World!"
    }
}