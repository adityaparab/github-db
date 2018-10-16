import { ghdb } from '../src';

import {
  cleanUpConfigFiles,
  INVALID_JSON_FILE_PATH,
  NON_EXISTENT_JSON_FILE_PATH,
  setupConfigFiles,
  VALID_JSON_FILE_PATH
} from './common/config-file-setup';

describe('Github Database Environment Tests', () => {
  beforeAll((done: any) => setupConfigFiles().then(done));

  afterAll((done: any) => cleanUpConfigFiles().then(done));

  test('should validate if config.json exists', (done: any) => {
    return ghdb.checkIfConfigFileExists(VALID_JSON_FILE_PATH).subscribe(
      (doesIt: boolean) => {
        expect(doesIt).toBe(true);
        done();
      },
      done,
      done
    );
  });

  test('should return false if config.json does not exist', (done: any) => {
    return ghdb.checkIfConfigFileExists(INVALID_JSON_FILE_PATH).subscribe(
      (doesIt: boolean) => {
        expect(doesIt).toBe(false);
        done();
      },
      done,
      done
    );
  });

  test('should stop validation when non existent config file path is provided', (done: any) => {
    return ghdb.validateConfigFile(NON_EXISTENT_JSON_FILE_PATH).subscribe(
      done,
      (error: boolean) => {
        expect(error).toBe(true);
        done();
      },
      done
    );
  });

  test('should fail validation when incorrect config file is provided', (done: any) => {
    return ghdb.validateConfigFile(INVALID_JSON_FILE_PATH).subscribe(
      done,
      (error: boolean) => {
        expect(error).toBe(true);
        done();
      },
      done
    );
  });

  test('should succeed validation when correct config file is provided', (done: any) => {
    return ghdb.validateConfigFile(VALID_JSON_FILE_PATH).subscribe(
      (success: boolean) => {
        expect(success).toBe(true);
        done();
      },
      done,
      done
    );
  });
});
