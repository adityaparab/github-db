import { BaseError } from './BaseError';

export class ConfigFileNotFoundError extends BaseError {
    constructor(path: string) {
        super();
        this.name = 'ConfigFileNotFoundError';
        this.message = `Config File Not Found at: ${path}`;
    }
}
