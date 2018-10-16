import { exists, readJson } from 'fs-extra';
import { join, resolve } from 'path';
import { Observable, Subject } from 'rxjs';
import { argv } from 'yargs';
import { IConfigFileOptions } from './models/IConfigFileOptions';
import { IInputArgs } from './models/IInputArgs';

class GitHubDatabase {
  private input: IInputArgs = argv as IInputArgs;
  private DEFAULT_CONFIG_FILE_PATH = './config.json';

  public init() {
    const configFilePath = this.input.config || this.DEFAULT_CONFIG_FILE_PATH;
    this.checkIfConfigFileExists(configFilePath).subscribe(
      this.successHandler,
      this.failureHanler,
      this.completionHandler
    );
  }

  public checkIfConfigFileExists(configFilePath: string): Observable<boolean> {
    const ConfigFileExistenceSubject = new Subject<boolean>();
    const cwd = process.cwd();
    const absolutePath = resolve(join(cwd, configFilePath || './config.json'));

    exists(absolutePath, (doesIt: boolean) => {
      doesIt
        ? ConfigFileExistenceSubject.next(true)
        : ConfigFileExistenceSubject.error(false);
      ConfigFileExistenceSubject.complete();
    });

    return ConfigFileExistenceSubject.asObservable();
  }

  public validateConfigFile(configFilePath: string): Observable<boolean> {
    const ConfigFileValidationSubject = new Subject<boolean>();

    readJson(configFilePath)
      .then((config: IConfigFileOptions) => {
        const { github } = config;
        const valid =
          github.password !== '' &&
          github.repo !== '' &&
          github.username !== '';
        valid
          ? ConfigFileValidationSubject.next(true)
          : ConfigFileValidationSubject.error(true);
        ConfigFileValidationSubject.complete();
      })
      .catch(() => {
        ConfigFileValidationSubject.error(true);
        ConfigFileValidationSubject.complete();
      });

    return ConfigFileValidationSubject.asObservable();
  }

  private successHandler(...args: any[]) {
    console.log('SUCCESS: ' + args.join(' '));
  }

  private failureHanler(...args: any[]) {
    console.error('ERROR: ' + args.join(' '));
  }

  private completionHandler() {
    console.log('COMPLETED');
  }
}

export const ghdb = new GitHubDatabase();
// ghdb.init();
