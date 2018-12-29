import { number, object, string } from 'joi';

const githubKeys = {
    password: string().required().error(new Error('github.password is required')),
    repo: string().uri().required().error(new Error('github.repo is required and should be a valid github repo url')),
    username: string().required().error(new Error('github.username is require'))
};

const keys = {
    github: object().keys(githubKeys).required(),
    port: number().required().error(new Error('port is required.'))
};

export const ConfigFileSchema = object().keys(keys);
