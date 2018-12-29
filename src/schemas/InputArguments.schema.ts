import chalk from 'chalk';
import { object, string } from 'joi';
import { ConfigFileNotSpecifiedError } from '../errors';
const options = {
    stripUnknown: true
};

const error = new ConfigFileNotSpecifiedError();

const keys = {
    config: string().required().error(error)
};

export const InputArgumentsSchema = object()
    .keys(keys)
    .options(options);
