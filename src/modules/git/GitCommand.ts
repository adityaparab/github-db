import { exec } from 'child_process';
import { inject, injectable } from 'inversify';
import { defer, Promise } from 'q';
import { TYPES } from '../../models/index';
import { DataCacheService } from '../../services/data-cache.service';

@injectable()
export class GitCommand {
  private command: string = '';
  private location: string = '';

  constructor(
    command: string,
    @inject(TYPES.DataCacheService) private dataCacheService: DataCacheService
  ) {
    this.command = command;
  }

  public execute(cmd: string = ''): Promise<boolean> {
    const { promise, reject, resolve } = defer<boolean>();

    const c = cmd || this.command;
    const cwd = this.dataCacheService.getRepoCheckoutLocation();
    console.log(c, ' || ', cwd);

    const command = exec(c, { cwd });

    command.stdout.on('close', () => {
      resolve();
    });

    return promise;
  }
}
