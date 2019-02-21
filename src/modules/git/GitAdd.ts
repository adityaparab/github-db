import { inject, injectable } from 'inversify';

import { TYPES } from '../../models/index';
import { DataCacheService } from '../../services/data-cache.service';
import {DatabaseService} from '../../services/Database.service';
import { GitCommand } from './GitCommand';

@injectable()
export class GitAdd extends GitCommand {
  constructor(
    @inject(TYPES.DatabaseService) databaseService: DatabaseService,
    @inject(TYPES.DataCacheService) dataCacheService: DataCacheService
  ) {
    super('git add data.json', dataCacheService);
  }
}
