import { ensureFile, remove, writeJson } from 'fs-extra';
import { join, resolve as pResolve } from 'path';
import { defer, Promise as qPromise } from 'q';
import { IConfigFileOptions } from '../../src/models/IConfigFileOptions';

export const VALID_JSON_FILE_PATH = pResolve(
  join(process.cwd(), './config.json')
);
export const INVALID_JSON_FILE_PATH = pResolve(
  join(process.cwd(), './invalid-config.json')
);

export const NON_EXISTENT_JSON_FILE_PATH = pResolve(
  join(process.cwd(), './_config.json')
);

export const INVALID_JSON_CONTENT: IConfigFileOptions = {
  github: {
    password: '',
    repo: '',
    username: ''
  }
};

export const VALID_JSON_CONTENT: IConfigFileOptions = {
  github: {
    password: 'abc',
    repo: 'https://github.com/adityaparab/database.git',
    username: 'adityaparab'
  }
};

export function setupConfigFiles(): qPromise<void> {
  const { promise, resolve, reject } = defer<void>();

  createValidJsonFile()
    .then(createInvalidJsonFile)
    .then(writeValidJsonFile)
    .then(writeInvalidJsonFile)
    .then(resolve)
    .then(reject);

  return promise;
}

function createValidJsonFile(): Promise<void> {
  return ensureFile(VALID_JSON_FILE_PATH);
}

function createInvalidJsonFile(): Promise<void> {
  return ensureFile(INVALID_JSON_FILE_PATH);
}

function writeValidJsonFile(): Promise<void> {
  return writeJson(VALID_JSON_FILE_PATH, VALID_JSON_CONTENT, { spaces: 2 });
}

function writeInvalidJsonFile(): Promise<void> {
  return writeJson(INVALID_JSON_FILE_PATH, INVALID_JSON_CONTENT, { spaces: 2 });
}

export function cleanUpConfigFiles(): Promise<void> {
  return remove(VALID_JSON_FILE_PATH).then(() =>
    remove(INVALID_JSON_FILE_PATH)
  );
}
