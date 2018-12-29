import 'reflect-metadata';
import { GithubDatabaseContainer } from './Container';
import { IGithubDatabase, TYPES } from './models';

const ghdbContainer = GithubDatabaseContainer.get<IGithubDatabase>(TYPES.IGithubDatabase);

ghdbContainer.init();
