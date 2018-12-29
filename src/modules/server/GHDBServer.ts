import { readJson, writeJson } from 'fs-extra';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../models';
import { DatabaseService } from '../../services/Database.service';

@injectable()
export class GHDBServer {
    constructor(
        @inject(TYPES.DatabaseService) private databaseService: DatabaseService
    ) {

    }
}
