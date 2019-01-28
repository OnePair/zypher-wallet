import { Application } from "express";
import { AuthIDAgentController, WalletController } from "./controllers";
import { AuthIDEdgeAgent } from "../authid-edge-agent";
import { Config } from "../config";

import express from "express";
import bodyParser from "body-parser";

const API_VERSION = "/v1";
const API_ENDPOINT = API_VERSION + "/agent";
const WALLET_ENDPOINT = API_VERSION + "/wallet";


export class ApiServer {
  private authIDAgent: AuthIDEdgeAgent
  private config: Config;
  private expressApp: Application;

  constructor(authIDAgent: AuthIDEdgeAgent, config: Config) {
    this.authIDAgent = authIDAgent;
    this.config = config;
  }

  public start(): void {
    this.expressApp.listen(this.config.getApiPort());
    console.log(`Api listen at http://localhost:${this.config.getApiPort()}/`);
  }

  public init(): void {
    this.expressApp = express();

    let walletController = new WalletController(this.authIDAgent);
    let authIDAgentController = new AuthIDAgentController(this.authIDAgent);

    this.expressApp.use(bodyParser.json());

    this.expressApp.use(API_ENDPOINT, authIDAgentController.getRouter());
    this.expressApp.use(WALLET_ENDPOINT, walletController.getRouter());

  }
}
