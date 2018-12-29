import { IConfigFileOptions } from './IConfigFileOptions';
import { IGithubDatabase } from './IGithubDatabase';
import { IInputArgs } from './IInputArgs';

export const TYPES = {
    DataCacheService: Symbol('DataCacheService'),
    DatabaseService: Symbol('DatabaseService'),
    EnvironmentSetup: Symbol('EnvironmentSetup'),
    GHDBServer: Symbol('GHDBServer'),
    IConfigFileOptions: Symbol('IConfigFileOptions'),
    IGithubCommandService: Symbol('IGithubCommandService'),
    IGithubDatabase: Symbol('IGithubDatabase'),
    IInputArgs: Symbol('IInputArgs'),
    VerifyGit: Symbol('VerifyGit')
};

export {
    IConfigFileOptions,
    IGithubDatabase,
    IInputArgs
};
