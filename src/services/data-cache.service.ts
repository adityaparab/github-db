import { injectable } from 'inversify';

export interface IDataCacheService {
  getConfigFilePath: () => string;
  setConfigFilePath: (configFilePath: string) => void;

  getGithubUsername: () => string;
  setGithubUsername: (githubUsername: string) => void;

  setGithubPassword: (githubPassword: string) => void;

  getGithubRepoUrl: () => string;
  setGithubRepoUrl: (githubRepoUrl: string) => void;
}

@injectable()
export class DataCacheService implements IDataCacheService {
  private ConfigFilePath: string = '';
  private GithubUsername: string = '';
  private GithubPassword: string = '';
  private GithubRepoUrl: string = '';

  public getConfigFilePath(): string {
    return this.ConfigFilePath;
  }

  public setConfigFilePath(configFilePath: string) {
    this.ConfigFilePath = configFilePath;
  }

  public getGithubUsername(): string {
    return this.GithubUsername;
  }

  public setGithubUsername(githubUsername: string) {
    this.GithubUsername = githubUsername;
  }

  public getGithubPassword() {
    return this.GithubPassword;
  }

  public setGithubPassword(githubPassword: string) {
    this.GithubPassword = githubPassword;
  }

  public getGithubRepoUrl(): string {
    return this.GithubRepoUrl;
  }

  public setGithubRepoUrl(githubRepoUrl: string) {
    this.GithubRepoUrl = githubRepoUrl;
  }
}
