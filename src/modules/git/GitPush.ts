import { inject, injectable } from 'inversify';
import { TYPES } from '../../models';
import { DataCacheService } from '../../services/data-cache.service';
import { DatabaseService } from '../../services/Database.service';
import { GitCommand } from './GitCommand';

@injectable()
export class GitPush extends GitCommand {
  constructor(
    @inject(TYPES.DataCacheService) dataCacheService: DataCacheService,
    @inject(TYPES.DatabaseService) databaseService: DatabaseService
  ) {
    super('git push origin master', dataCacheService);
  }
}
