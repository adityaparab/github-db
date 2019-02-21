import { inject, injectable } from 'inversify';
import moment from 'moment';
import { Promise } from 'q';
import { TYPES } from '../../models';
import { DataCacheService } from '../../services/data-cache.service';
import { DatabaseService } from '../../services/Database.service';
import { GitCommand } from './GitCommand';

@injectable()
export class GitCommit extends GitCommand {
  public service: any;
  constructor(
    @inject(TYPES.DataCacheService) dataCacheService: DataCacheService,
    @inject(TYPES.DatabaseService) databaseService: DatabaseService
  ) {
    const username = dataCacheService.getGithubUsername();
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    const message = `Automated commit via GHDB Server by ${username} on ${timestamp}`;
    super(`git commit -m "${message}"`, dataCacheService);
    this.service = dataCacheService;
  }

  public execute(): Promise<boolean> {
    const username = this.service.getGithubUsername();
    const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');
    const message = `git commit -m "Automated commit via GHDB Server by ${username} on ${timestamp}"`;
    return super.execute(message);
  }
}
