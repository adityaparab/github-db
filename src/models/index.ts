import { IConfigFileOptions } from './IConfigFileOptions';
import { IGithubDatabase } from './IGithubDatabase';
import { IInputArgs } from './IInputArgs';

export const TYPES = {
  DataCacheService: Symbol('DataCacheService'),
  DatabaseService: Symbol('DatabaseService'),
  EnvironmentSetup: Symbol('EnvironmentSetup'),
  GHDBServer: Symbol('GHDBServer'),
  GHDBServerRouter: Symbol('GHDBServerRouter'),
  GitAdd: Symbol('GitAdd'),
  GitCommand: Symbol('GitCommand'),
  GitCommit: Symbol('GitCommit'),
  GitPull: Symbol('GitPull'),
  GitPush: Symbol('GitPush'),
  IConfigFileOptions: Symbol('IConfigFileOptions'),
  IGithubCommandService: Symbol('IGithubCommandService'),
  IGithubDatabase: Symbol('IGithubDatabase'),
  IInputArgs: Symbol('IInputArgs'),
  VerifyGit: Symbol('VerifyGit')
};

export { IConfigFileOptions, IGithubDatabase, IInputArgs };
