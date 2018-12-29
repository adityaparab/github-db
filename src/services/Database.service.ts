import { writeJson } from 'fs-extra';
import { inject, injectable } from 'inversify';
import path from 'path';
import { defer, Deferred, Promise } from 'q';
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
    }

    public getDatabaseFilePath() {
        const repo = this.dataCacheService.getGithubRepoUrl();
        this.gitrepoName = path.basename(repo, '.git');
        this.gitRepoPath = path.resolve(path.join(this.cwd, this.gitrepoName));
        this.databaseFilePath = path.resolve(path.join(this.gitRepoPath, 'data.json'));
        return this.databaseFilePath;
    }

    public getDatabase() {
        return this.database;
    }

    public updateDatabase(database: any): Promise<void> {
        const deferred: Deferred<void> = defer<void>();
        const { promise, reject, resolve } = deferred;

        writeJson(this.databaseFilePath, database, { spaces: 2 })
            .then(() => {
                // implement git commit and push here.
                this.setDatabase(database);
                resolve();
            })
            .catch((error: Error) => reject(error));

        return promise;
    }

    public setDatabase(database: any) {
        this.database = database;
    }
}
