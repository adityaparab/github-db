import { injectable } from 'inversify';
import { join, parse, ParsedPath } from 'path';

export interface IDataCacheService {
  getConfigFilePath: () => string;
  setConfigFilePath: (configFilePath: string) => void;

  getGithubUsername: () => string;
  setGithubUsername: (githubUsername: string) => void;

  getGithubPassword: () => string;
  setGithubPassword: (githubPassword: string) => void;

  getGithubRepoUrl: () => string;
  setGithubRepoUrl: (githubRepoUrl: string) => void;

  getGHDBServerPort: () => number;
  setGHDBServerPort: (port: number) => void;

  getRepoCheckoutLocation: () => string;
}

@injectable()
export class DataCacheService implements IDataCacheService {
  private ConfigFilePath: string = '';
  private GithubUsername: string = '';
  private GithubPassword: string = '';
  private GithubRepoUrl: string = '';
  private GHDBServerPort: number = 0;

  private RepoFolderName: string = '';
  private RepoCheckoutLocation: string = '';

  public getConfigFilePath(): string {
    return this.ConfigFilePath;
  }

  public setConfigFilePath(configFilePath: string) {
    const path: ParsedPath = parse(configFilePath);
    this.RepoCheckoutLocation = path.dir;
    this.ConfigFilePath = configFilePath;
  }

  public getGithubUsername(): string {
    return this.GithubUsername;
  }

  public setGithubUsername(githubUsername: string) {
    this.GithubUsername = encodeURIComponent(githubUsername);
  }

  public getGithubPassword() {
    return this.GithubPassword;
  }

  public setGithubPassword(githubPassword: string) {
    this.GithubPassword = encodeURIComponent(githubPassword);
  }

  public getGithubRepoUrl(): string {
    return this.GithubRepoUrl;
  }

  public setGithubRepoUrl(githubRepoUrl: string) {
    const path: ParsedPath = parse(githubRepoUrl);
    this.RepoFolderName = path.name;
    this.GithubRepoUrl = githubRepoUrl;
  }

  public getGHDBServerPort(): number {
    return this.GHDBServerPort;
  }

  public setGHDBServerPort(port: number): void {
    this.GHDBServerPort = port;
  }

  public getRepoCheckoutLocation() {
    return join(this.RepoCheckoutLocation, this.RepoFolderName);
  }
}
