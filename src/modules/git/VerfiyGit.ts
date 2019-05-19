import chalk from 'chalk';
import {
  exec,
  spawn
} from 'child_process';
import { exists } from 'fs-extra';
import {
  inject,
  injectable
} from 'inversify';
import path from 'path';
import {
  defer,
  Promise
} from 'q';

import { TYPES } from '../../models';
import { IDataCacheService } from '../../services/data-cache.service';
import { IGithubCommandService } from '../../services/GithubCommand.service';
import { rewriteLine } from '../../util/console';

@injectable()
export class VerifyGit {
    private repo: string = '';
    private directory: string = '';
    private gitCloneUrl: string = '';
    private gitRepoPath: string = '';
    constructor(
        @inject(TYPES.DataCacheService) private dataCacheService: IDataCacheService,
        @inject(TYPES.IGithubCommandService) private githubCommandService: IGithubCommandService
    ) { }

    public init() {
        const cwd = process.cwd();
        this.repo = this.dataCacheService.getGithubRepoUrl();
        this.directory = path.basename(this.repo, '.git');
        this.gitCloneUrl = this.githubCommandService.getGitCloneUrl();
        this.gitRepoPath = path.resolve(path.join(cwd, this.directory));
        rewriteLine(chalk.yellow('Verifying Git Repository Setup'));
        return this.verifyGitInstallation()
            .then(() => this.finaliseOrClone())
            .then(() => rewriteLine(chalk.green('Git Repository Setup Done'), true));
    }

    public verifyGitInstallation(): Promise<void> {
        const deferred = defer<void>();
        const { promise, reject, resolve } = deferred;
        const gitCommand = exec('git --version');
        let clean = true;

        gitCommand.stderr.on('data', (err: string) => {
            clean = false;
        });

        gitCommand.stdout.on('close', (...args) => {
            if (clean) {
                resolve();
            } else {
                reject(new Error('Please Install Git before you can use this software'));
            }
        });

        return promise;
    }

    public cloneRepo(): Promise<void> {
        const deferred = defer<void>();
        const { promise, resolve } = deferred;

        console.log(process.cwd());

        const gitCloneCommand = spawn('git', ['clone', this.gitCloneUrl], { cwd: process.cwd() });
        gitCloneCommand.stdout.setEncoding('utf8');
        gitCloneCommand.stderr.setEncoding('utf8');

        gitCloneCommand.stderr.on('data', (msg: string) => {
            console.log(msg);
        });

        gitCloneCommand.stdout.on('data', (msg: string) => {
            console.log(msg);
        });

        gitCloneCommand.on('close', (msg: string) => {
            resolve();
        });

        return promise;
    }

    public finaliseOrClone(): Promise<void> {
        const deferred = defer<void>();
        const { promise, reject, resolve } = deferred;

        this.isGitRepoInitialised()
            .then(() => resolve())
            .catch(() => {
                this.cloneRepo()
                    .then(() => resolve())
                    .catch((error: Error) => reject(error));
            });

        return promise;
    }

    public isGitRepoInitialised(): Promise<void> {
        const deferred = defer<void>();
        const { promise, reject, resolve } = deferred;

        exists(this.gitRepoPath, (result: boolean) => {
            if (result) {
                resolve();
            } else {
                reject();
            }
        });

        return promise;
    }
}
