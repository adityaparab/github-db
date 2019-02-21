import { Container } from 'inversify';
import { GithubDatabase } from './GithubDatabase';
import { IGithubDatabase, TYPES } from './models';
import { EnvironmentSetup } from './modules/environment/EnvironmentSetup';
import { GitAdd } from './modules/git/GitAdd';
import { GitCommand } from './modules/git/GitCommand';
import { GitCommit } from './modules/git/GitCommit';
import { GitPull } from './modules/git/GitPull';
import { GitPush } from './modules/git/GitPush';
import { VerifyGit } from './modules/git/VerfiyGit';
import { GHDBServer } from './modules/server/GHDBServer';
import { GHDBServerRouter } from './modules/server/routes';
import {
  DataCacheService,
  IDataCacheService
} from './services/data-cache.service';
import { DatabaseService, IDatabaseService } from './services/Database.service';
import {
  GithubCommandService,
  IGithubCommandService
} from './services/GithubCommand.service';

export const GithubDatabaseContainer: Container = new Container();

GithubDatabaseContainer.bind<IGithubDatabase>(TYPES.IGithubDatabase).to(
  GithubDatabase
);

GithubDatabaseContainer.bind<IDataCacheService>(TYPES.DataCacheService)
  .to(DataCacheService)
  .inSingletonScope();

GithubDatabaseContainer.bind<EnvironmentSetup>(TYPES.EnvironmentSetup)
  .to(EnvironmentSetup)
  .inSingletonScope();

GithubDatabaseContainer.bind<VerifyGit>(TYPES.VerifyGit)
  .to(VerifyGit)
  .inSingletonScope();

GithubDatabaseContainer.bind<GitAdd>(TYPES.GitAdd)
  .to(GitAdd)
  .inSingletonScope();

GithubDatabaseContainer.bind<GitCommand>(TYPES.GitCommand)
  .to(GitCommand)
  .inSingletonScope();

GithubDatabaseContainer.bind<GitCommit>(TYPES.GitCommit)
  .to(GitCommit)
  .inSingletonScope();

GithubDatabaseContainer.bind<GitPull>(TYPES.GitPull)
  .to(GitPull)
  .inSingletonScope();

GithubDatabaseContainer.bind<GitPush>(TYPES.GitPush)
  .to(GitPush)
  .inSingletonScope();

GithubDatabaseContainer.bind<IGithubCommandService>(TYPES.IGithubCommandService)
  .to(GithubCommandService)
  .inSingletonScope();

GithubDatabaseContainer.bind<GHDBServer>(TYPES.GHDBServer)
  .to(GHDBServer)
  .inSingletonScope();

GithubDatabaseContainer.bind<IDatabaseService>(TYPES.DatabaseService)
  .to(DatabaseService)
  .inSingletonScope();

GithubDatabaseContainer.bind<GHDBServerRouter>(TYPES.GHDBServerRouter)
  .to(GHDBServerRouter)
  .inSingletonScope();
