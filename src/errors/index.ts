import { BaseError } from './BaseError';
import { ConfigFileNotFoundError } from './ConfigFileNotFound.error';
import { ConfigFileNotSpecifiedError } from './ConfigFileNotSpecified.error';

export type GenericError = BaseError | ConfigFileNotFoundError | ConfigFileNotSpecifiedError;

export {
    BaseError,
    ConfigFileNotFoundError,
    ConfigFileNotSpecifiedError
};
