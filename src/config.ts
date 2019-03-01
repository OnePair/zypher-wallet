import { homedir } from "os";

import path from "path";
import fs from "fs";
import mkdirp from "mkdirp";

export const APP_DIR = path.join(homedir(), ".zypher-wallet");
const CONFIG_PATH = path.join(APP_DIR, "config.json");

const API_PORT = "api_port";
const ETH_RPC_HOST = "eth_rpc_host";
const IPFS_HOST = "ipfs_host";

const DEFAULT_API_PORT = 7777;
const DEFAULT_ETH_RPC_HOST = "http://localhost:8545";
const DEFAULT_IPFS_HOST = "/ip4/127.0.0.1/tcp/5001";


export class Config {
  private config: object;

  constructor() {
    this.initEnv();
  }

  public getApiPort(): number {
    return this.config[API_PORT];
  }

  public setApiPort(port: number): void {
    this.config[API_PORT] = port;
  }

  public getEthRPCHost(): string {
    return this.config[ETH_RPC_HOST];
  }

  public setEthRPCHost(host: string): void {
    this.config[ETH_RPC_HOST] = host;
  }

  public getIpfsHost(): string {
    return this.config[IPFS_HOST];
  }

  public setIpfsHost(host: string): void {
    this.config[IPFS_HOST] = host;
  }

  public save(): void {
    let configJson = JSON.stringify(this.config);
    fs.writeFileSync(CONFIG_PATH, configJson);
  }

  private initEnv(): void {
    // Create config if it does not exists
    if (!fs.existsSync(CONFIG_PATH)) {
      mkdirp.sync(APP_DIR);
      this.config = this.getDefaultConfig();
      this.save();
    } else {
      // load config from the file system
      let jsonConfig = fs.readFileSync(CONFIG_PATH).toString();
      this.config = JSON.parse(jsonConfig);
    }
  }

  private getDefaultConfig(): object {
    return {
      [API_PORT]: DEFAULT_API_PORT,
      [ETH_RPC_HOST]: DEFAULT_ETH_RPC_HOST,
      [IPFS_HOST]: DEFAULT_IPFS_HOST
    };
  }
}
