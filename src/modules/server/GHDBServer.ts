import chalk from 'chalk';
import { readJson } from 'fs-extra';
import { inject, injectable } from 'inversify';
import { defer, Deferred, Promise } from 'q';
import { createServer, plugins, Server } from 'restify';
import corsMiddleware from 'restify-cors-middleware';
import { TYPES } from '../../models';
import { DatabaseService } from '../../services/Database.service';
import { rewriteLine } from '../../util/console';
import { GHDBServerRouter } from './routes';

@injectable()
export class GHDBServer {
    private server: Server = createServer();
    private corsOptions: corsMiddleware.Options = {
        allowHeaders: ['*'],
        exposeHeaders: ['*'],
        origins: ['*']
    };
    private cors: corsMiddleware.CorsMiddleware = corsMiddleware(this.corsOptions);
    constructor(
        @inject(TYPES.DatabaseService) private databaseService: DatabaseService,
        @inject(TYPES.GHDBServerRouter) private router: GHDBServerRouter
    ) {
        this.server.pre(this.cors.preflight);
        this.server.use(this.cors.actual);
        this.server.use(plugins.bodyParser());
    }

    public init(): Promise<void> {
        rewriteLine(chalk.yellow('Initializing GHDB Server'));
        const deferred: Deferred<void> = defer<void>();
        const { promise, reject, resolve } = deferred;

        this.getDatabase()
            .then(() => {
                this.router.configure(this.server);
                rewriteLine(chalk.green('GHDB Server Initialization Successful'), true);
                this.startServer();
                resolve();
            })
            .catch((error: Error) => reject(error));

        return promise;
    }

    private startServer(): void {
        this.server.listen(3000, () => {
            console.log(chalk.green('GHDB Server Running on port 3000'));
        });
    }

    private getDatabase(): Promise<void> {
        const deferred: Deferred<void> = defer<void>();
        const { promise, reject, resolve } = deferred;
        readJson(this.databaseService.getDatabaseFilePath())
            .then((database: any) => {
                this.databaseService.setDatabase(database);
                resolve();
            })
            .catch((error: Error) => reject(error));

        return promise;
    }
}
