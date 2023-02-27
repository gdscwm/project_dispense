import {Inject, Service} from "@tsed/di";
import * as fs from "fs";
import {Logger} from "@tsed/logger";
import {BadRequest} from "@tsed/exceptions";
const { spawn } = require('child_process');

@Service()
export class PythonService {
    @Inject()
    private logger: Logger;

    async spawn(path: fs.PathLike, args: string[] = []) {
        this.validate(path)

        try {
            const process = spawn('python', [path, ...args]);
            const name = `${process.pid} - ${path}`;
            await this.monitor(process, name);
        } catch (e) {
            throw new BadRequest(`Error executing ${path} with args [${args.join(', ')}]`)
        }
    }

    private validate(path: fs.PathLike) {
        const exists: boolean = fs.existsSync(path)
        const extension: boolean = path.toString().endsWith(".py");
        if (!exists || !extension) throw new BadRequest(`File ${path} is not compatible with PythonService`);
        return exists;
    }

    private monitor(process: any, name: string) {
        return new Promise<void>((resolve, reject) => {
            process.stdout.on('data', (data: never) => this.logger.info(`${name} [STDOUT]: ${data}`));
            process.stderr.on('data', (data: never) => this.logger.error(`stderr: ${data}`));
            process.on('close', (code: never) => this.logger.info(`${name}: child process exited with code ${code}`));
            process.on('exit', (code: never) => code==0 ? resolve() : reject())
        });
    }
}