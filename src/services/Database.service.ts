import { inject, injectable } from 'inversify';
import path from 'path';
import { TYPES } from '../models';
import { DataCacheService } from './data-cache.service';

export interface IDatabaseService {
    getDatabaseFilePath: () => string;
    getDatabase: () => any;
    updateDatabase: (collection: any) => void;
}

@injectable()
export class DatabaseService implements IDatabaseService {
    private cwd: string = process.cwd();
    private gitrepoName: string = '';
    private gitRepoPath: string = '';
    private databaseFilePath: string = '';
    private database: any;
    constructor(
        @inject(TYPES.DataCacheService) private dataCacheService: DataCacheService
    ) {
        const repo = dataCacheService.getGithubRepoUrl();
        this.gitrepoName = path.basename(repo, '.git');
        this.gitRepoPath = path.resolve(path.join(this.cwd, this.gitrepoName));
        this.databaseFilePath = path.resolve(path.join(this.gitRepoPath, 'data.json'));
    }

    public getDatabaseFilePath() {
        return this.databaseFilePath;
    }

    public getDatabase() {
        return this.database;
    }

    public updateDatabase(collection: any) {
        //
    }
}
