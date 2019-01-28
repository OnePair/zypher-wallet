"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("./controllers");
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var API_VERSION = "/v1";
var API_ENDPOINT = API_VERSION + "/agent";
var WALLET_ENDPOINT = API_VERSION + "/wallet";
var ApiServer = /** @class */ (function () {
    function ApiServer(authIDAgent, config) {
        this.authIDAgent = authIDAgent;
        this.config = config;
    }
    ApiServer.prototype.start = function () {
        this.expressApp.listen(this.config.getApiPort());
        console.log("Api listen at http://localhost:" + this.config.getApiPort() + "/");
    };
    ApiServer.prototype.init = function () {
        this.expressApp = express_1.default();
        var walletController = new controllers_1.WalletController(this.authIDAgent);
        var authIDAgentController = new controllers_1.AuthIDAgentController(this.authIDAgent);
        this.expressApp.use(body_parser_1.default.json());
        this.expressApp.use(API_ENDPOINT, authIDAgentController.getRouter());
        this.expressApp.use(WALLET_ENDPOINT, walletController.getRouter());
    };
    return ApiServer;
}());
exports.ApiServer = ApiServer;
