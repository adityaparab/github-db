import { Container } from 'inversify';
import { GithubDatabase } from './GithubDatabase';
import { IGithubDatabase, TYPES } from './models';
import { EnvironmentSetup } from './modules/environment/EnvironmentSetup';
import { VerifyGit } from './modules/git/VerfiyGit';
import { DataCacheService, IDataCacheService } from './services/data-cache.service';
import { GithubCommandService, IGithubCommandService } from './services/GithubCommand.service';

export const GithubDatabaseContainer: Container = new Container();

GithubDatabaseContainer
    .bind<IGithubDatabase>(TYPES.IGithubDatabase)
    .to(GithubDatabase);

GithubDatabaseContainer
    .bind<IDataCacheService>(TYPES.DataCacheService)
    .to(DataCacheService)
    .inSingletonScope();

GithubDatabaseContainer
    .bind<EnvironmentSetup>(TYPES.EnvironmentSetup)
    .to(EnvironmentSetup)
    .inSingletonScope();

GithubDatabaseContainer
    .bind<VerifyGit>(TYPES.VerifyGit)
    .to(VerifyGit)
    .inSingletonScope();

GithubDatabaseContainer
    .bind<IGithubCommandService>(TYPES.IGithubCommandService)
    .to(GithubCommandService)
    .inSingletonScope();