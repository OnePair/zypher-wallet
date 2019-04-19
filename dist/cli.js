#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var app_1 = require("./app");
var config_1 = require("./config");
commander_1.default.command("start")
    //.arguments("[port] [ipfsHost] [ethHost]")
    .option("-o, --port <port>", "The port to listen on.")
    .option("-e, --ethHost <ethHost>", "The Ethereum node.")
    .option("-i, --ipfsHost <ipfsHost>", "The ipfs node.")
    .action(function (program) {
    app_1.startApiServer(program.port, program.ethHost, program.ipfsHost);
});
commander_1.default.command("setIpfsHost <host>")
    .action(function (host) {
    var config = new config_1.Config();
    config.setIpfsHost(host);
    config.save();
});
commander_1.default.command("setEthHost <host>")
    .action(function (host) {
    var config = new config_1.Config();
    config.setEthRPCHost(host);
    config.save();
});
commander_1.default.command("setPort <port>")
    .action(function (port) {
    var config = new config_1.Config();
    config.setApiPort(port);
    config.save();
});
commander_1.default.parse(process.argv);
