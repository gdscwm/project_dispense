import {Controller, Inject} from "@tsed/di";
import {FlowService} from "../../providers/FlowProvider";
import {PythonService} from "../../providers/PythonProvider";
import {Description, Example, Get, Returns} from "@tsed/schema";

@Controller('/webhook')
export class WebhookController {
    @Inject()
    private flow: FlowService;

    @Inject()
    private python: PythonService;

    @Get('/test')
    @Description('Test the endpoint')
    @Returns(200, String)
    @Example('Success!')
    async test() {
      await this.python.spawn(
          "/Users/jlap/Documents/code/gdc/Project-Dispense/scripts/test.py",
          ["test", "test2"]
      );

      return "Success!"
    }
}