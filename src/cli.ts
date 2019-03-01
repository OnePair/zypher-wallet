#!/usr/bin/env node

import program from "commander";
import { startApiServer } from "./app";
import { Config } from "./config";

program.command("start")
  //.arguments("[port] [ipfsHost] [ethHost]")
  .option("-o, --port <port>", "The port to listen on.")
  .option("-e, --ethHost <ethHost>", "The Ethereum node.")
  .option("-i, --ipfsHost <ipfsHost>", "The ipfs node.")
  .action((program) => {
    startApiServer(program.port, program.ethHost, program.ipfsHost);
  });

program.command("setIpfsHost <host>")
  .action((host) => {
    let config = new Config();
    config.setIpfsHost(host);
    config.save();
  });

program.command("setEthHost <host>")
  .action((host) => {
    let config = new Config();
    config.setEthRPCHost(host);
    config.save();
  });

program.command("setPort <port>")
  .action((port) => {
    let config = new Config();
    config.setApiPort(port);
    config.save();
  });


program.parse(process.argv)
