import chalk from 'chalk';
import { exists, readJson } from 'fs-extra';
import { inject, injectable } from 'inversify';
import { validate, ValidationError } from 'joi';
import path from 'path';
import { defer, Promise } from 'q';
import { Arguments, argv } from 'yargs';
import { ConfigFileNotFoundError } from '../../errors';
import { IConfigFileOptions, IInputArgs, TYPES } from '../../models';
import { ConfigFileSchema } from '../../schemas/ConfigFile.schema';
import { InputArgumentsSchema } from '../../schemas/InputArguments.schema';
import { IDataCacheService } from '../../services/data-cache.service';
import { rewriteLine } from '../../util/console';

@injectable()
export class EnvironmentSetup {
  private commandLineArguments = argv as Arguments<IInputArgs>;

  constructor(
    @inject(TYPES.DataCacheService) private dataCacheService: IDataCacheService
  ) {}

  public init(): Promise<void> {
    rewriteLine(chalk.yellow('Setting up Environment'));
    return this.validateInput()
      .then(() => this.validateConfigFileExistence())
      .then(() => this.validateConfigFileContents())
      .then(() => rewriteLine(chalk.green('Environment Setup Done'), true));
  }

  public validateInput(): Promise<void> {
    const deferred = defer<void>();
    const { promise, reject, resolve } = deferred;
    validate(this.commandLineArguments, InputArgumentsSchema)
      .then(() => resolve())
      .catch((error) => reject(error));

    return promise;
  }

  public validateConfigFileExistence(): Promise<void> {
    const deferred = defer<void>();
    const { promise, reject, resolve } = deferred;

    const configFilePath = path.resolve(
      path.join(process.cwd(), this.commandLineArguments.config)
    );
    exists(configFilePath, (fileExists: boolean) => {
      if (fileExists) {
        this.dataCacheService.setConfigFilePath(configFilePath);
        resolve();
      } else {
        reject(new ConfigFileNotFoundError(configFilePath));
      }
    });

    return promise;
  }

  public validateConfigFileContents(): Promise<void> {
    const deferred = defer<void>();
    const { promise, reject, resolve } = deferred;
    const filePath = this.dataCacheService.getConfigFilePath();

    readJson(filePath, (error: Error, config: IConfigFileOptions) => {
      if (error !== null) {
        reject(error);
      } else {
        validate(config, ConfigFileSchema)
          .then(() => {
            this.dataCacheService.setGithubPassword(config.github.password);
            this.dataCacheService.setGithubRepoUrl(config.github.repo);
            this.dataCacheService.setGithubUsername(config.github.username);
            this.dataCacheService.setGHDBServerPort(config.port);
            resolve();
          })
          .catch((errorV: ValidationError) => reject(errorV));
      }
    });

    return promise;
  }
}
