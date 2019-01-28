"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = require("os");
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var mkdirp_1 = __importDefault(require("mkdirp"));
exports.APP_DIR = path_1.default.join(os_1.homedir(), ".zypher-wallet");
var CONFIG_PATH = path_1.default.join(exports.APP_DIR, "config.json");
var API_PORT = "api_port";
var ETH_RPC_HOST = "eth_rpc_host";
var IPFS_HOST = "ipfs_host";
var DEFAULT_API_PORT = 3000;
var DEFAULT_ETH_RPC_HOST = "http://localhost:8545";
var DEFAULT_IPFS_HOST = "/ip4/127.0.0.1/tcp/5001";
var Config = /** @class */ (function () {
    function Config() {
        this.initEnv();
    }
    Config.prototype.getApiPort = function () {
        return this.config[API_PORT];
    };
    Config.prototype.getEthRPCHost = function () {
        return this.config[ETH_RPC_HOST];
    };
    Config.prototype.getIpfsHost = function () {
        return this.config[IPFS_HOST];
    };
    Config.prototype.initEnv = function () {
        // Create config if it does not exists
        if (!fs_1.default.existsSync(CONFIG_PATH)) {
            mkdirp_1.default.sync(exports.APP_DIR);
            this.config = this.getDefaultConfig();
            this.save();
        }
        else {
            // load config from the file system
            var jsonConfig = fs_1.default.readFileSync(CONFIG_PATH).toString();
            this.config = JSON.parse(jsonConfig);
        }
    };
    Config.prototype.save = function () {
        var configJson = JSON.stringify(this.config);
        fs_1.default.writeFileSync(CONFIG_PATH, configJson);
    };
    Config.prototype.getDefaultConfig = function () {
        var _a;
        return _a = {},
            _a[API_PORT] = DEFAULT_API_PORT,
            _a[ETH_RPC_HOST] = DEFAULT_ETH_RPC_HOST,
            _a[IPFS_HOST] = DEFAULT_IPFS_HOST,
            _a;
    };
    return Config;
}());
exports.Config = Config;
