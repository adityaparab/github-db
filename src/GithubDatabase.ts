import { inject, injectable } from 'inversify';
import { GenericError } from './errors';
import { IGithubDatabase, TYPES } from './models';
import { EnvironmentSetup } from './modules/environment/EnvironmentSetup';
import { VerifyGit } from './modules/git/VerfiyGit';
import { GHDBServer } from './modules/server/GHDBServer';

@injectable()
export class GithubDatabase implements IGithubDatabase {
    constructor(
        @inject(TYPES.EnvironmentSetup) private environmentSetup: EnvironmentSetup,
        @inject(TYPES.VerifyGit) private verifyGit: VerifyGit,
        @inject(TYPES.GHDBServer) private ghdbServer: GHDBServer
    ) { }

    public init() {
        this.environmentSetup.init()
            .then(() => this.verifyGit.init())
            .then(() => this.ghdbServer.init())
            .catch((error: GenericError) => {
                console.error(error);
            });
    }
}
