import { inject, injectable } from 'inversify';
import { TYPES } from '../models';
import { DataCacheService } from './data-cache.service';

export interface IGithubCommandService {
    getGitCloneUrl: () => string;
}

@injectable()
export class GithubCommandService implements IGithubCommandService {
    private cloneUrl: string = '';
    constructor(
        @inject(TYPES.DataCacheService) private dataCacheService: DataCacheService
    ) { }

    public getGitCloneUrl() {
        const githubUsername = this.dataCacheService.getGithubUsername();
        const githubPassword = this.dataCacheService.getGithubPassword();
        const githubRepoUrl = this.dataCacheService.getGithubRepoUrl();

        const url = githubRepoUrl.split('//');
        this.cloneUrl = `https://${githubUsername}:${githubPassword}@${url[1]}`;
        return this.cloneUrl;
    }
}
