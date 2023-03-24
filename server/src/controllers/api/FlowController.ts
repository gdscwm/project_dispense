import {Controller, Inject} from "@tsed/di";
import {FlowService} from "../../providers/FlowProvider";
import {Post} from "@tsed/schema";
import {BodyParams} from "@tsed/platform-params";

@Controller('/flow')
export class FlowController {
    @Inject()
    private flow: FlowService;

    @Post('/test')
    async upload(@BodyParams() body: object) {
        return await this.flow.send(body);
    }
}