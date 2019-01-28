import { Config } from "./config";
import { ApiServer } from "./api";
import { AuthIDEdgeAgent } from "./authid-edge-agent";


async function startApiServer() {
  const config = new Config();

  let authIDEdgeAgent = new AuthIDEdgeAgent(config);
  await authIDEdgeAgent.init();

  let apiServer = new ApiServer(authIDEdgeAgent, config);
  apiServer.init();
  apiServer.start();
}

startApiServer();

// Electron app
