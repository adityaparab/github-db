import { argv } from 'yargs';
import { IInputArgs } from './models/IInputArgs';

class GitHubDatabase {
  private input: IInputArgs = argv as IInputArgs;

  public init() {
    console.log(argv);
  }
}

export const ghdb = new GitHubDatabase();
ghdb.init();
