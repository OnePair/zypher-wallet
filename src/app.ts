import { Config } from "./config";
import { ApiServer } from "./api";
import { AuthIDEdgeAgent } from "./authid-edge-agent";


export async function startApiServer(port: number, ethHost: string,
  ipfsHost: string) {

  const config = new Config();

  if (port != undefined)
    config.setApiPort(port);
  if (ethHost != undefined)
    config.setEthRPCHost(ethHost);
  if (ipfsHost != undefined)
    config.setIpfsHost(ipfsHost);

  let authIDEdgeAgent = new AuthIDEdgeAgent(config);
  await authIDEdgeAgent.init();

  let apiServer = new ApiServer(authIDEdgeAgent, config);
  apiServer.init();
  apiServer.start();
}
