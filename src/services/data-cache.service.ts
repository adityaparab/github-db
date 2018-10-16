import { join, resolve } from 'path';

class DataCacheService {
  private ConfigFilePath: string = '';
  private GithubUsername: string = '';
  private GithubPassword: string = '';
  private GuthubRepoUrl: string = '';

  public get configFilePath(): string {
    return this.ConfigFilePath;
  }

  public set configFilePath(configFilePath: string) {
    this.ConfigFilePath = configFilePath;
  }

  public get githubUsername(): string {
    return this.GithubUsername;
  }

  public set githubUsername(githubUsername: string) {
    this.GithubUsername = githubUsername;
  }

  public get githubPassword(): string {
    return this.GithubPassword;
  }

  public set githubPassword(githubPassword: string) {
    this.GithubPassword = githubPassword;
  }

  public get guthubRepoUrl(): string {
    return this.GuthubRepoUrl;
  }

  public set guthubRepoUrl(guthubRepoUrl: string) {
    this.GuthubRepoUrl = guthubRepoUrl;
  }
}

export const DataCache = new DataCacheService();
