import {
  Answers,
  prompt,
  Question,
  Questions
} from 'inquirer';
import {
  inject,
  injectable
} from 'inversify';

import { GenericError } from './errors';
import {
  IGithubDatabase,
  TYPES
} from './models';
import { EnvironmentSetup } from './modules/environment/EnvironmentSetup';
import { VerifyGit } from './modules/git/VerfiyGit';
import { GHDBServer } from './modules/server/GHDBServer';

const questions: Questions = [
  {
    message: 'Enter your Github Username',
    name: 'username',
    type: 'input'
  },
  {
    message: 'Enter your Github Password',
    name: 'password',
    type: 'password'
  }
];

@injectable()
export class GithubDatabase implements IGithubDatabase {
  constructor(
    @inject(TYPES.EnvironmentSetup) private environmentSetup: EnvironmentSetup,
    @inject(TYPES.VerifyGit) private verifyGit: VerifyGit,
    @inject(TYPES.GHDBServer) private ghdbServer: GHDBServer
  ) {}

  public init() {
    // prompt(questions).then((answers: Answers) => {
    //   console.log(answers);
    // });

    this.environmentSetup
      .init()
      .then(() => this.verifyGit.init())
      .then(() => this.ghdbServer.init())
      .catch((error: GenericError) => {
        console.error(error);
      });
  }
}
