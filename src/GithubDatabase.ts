import { inject, injectable } from 'inversify';
import { GenericError } from './errors';
import { IGithubDatabase, TYPES } from './models';
import { EnvironmentSetup } from './modules/environment/EnvironmentSetup';
import { VerifyGit } from './modules/git/VerfiyGit';

@injectable()
export class GithubDatabase implements IGithubDatabase {
    constructor(
        @inject(TYPES.EnvironmentSetup) private environmentSetup: EnvironmentSetup,
        @inject(TYPES.VerifyGit) private verifyGit: VerifyGit
    ) { }

    public init() {
        this.environmentSetup.init()
            .then(() => this.verifyGit.init())
            .then(() => console.log('Success'))
            .catch((error: GenericError) => {
                console.error(error);
            });
    }
}
