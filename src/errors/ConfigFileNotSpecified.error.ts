import { BaseError } from './BaseError';

export class ConfigFileNotSpecifiedError extends BaseError {
    constructor() {
        super();
        this.name = 'ConfigFileNotSpecifiedError';
        this.message = `
Missing mandatory option --config
Please specify a ralative path to your configuration json file using --config option
Example: ghdb --config ./config.json

config.json file should be in following format
{
    github: {
        password: string;
        repo: string;
        username: string;
    };
    port: number;
}`;
    }
}
