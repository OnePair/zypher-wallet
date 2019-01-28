"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var authid_core_ts_1 = require("authid-core-ts");
var authid_eth_driver_1 = require("authid-eth-driver");
var providers_1 = require("authid-eth-driver/node_modules/ethers/providers");
var path_1 = __importDefault(require("path"));
var ETH = "ETH";
var ETHB_DID = "ethb";
var SUPPORTED_PROTOCOLS = [ETH];
/*
* TODO: Create an interface for an authid wallet (authid-core).
*/
var AuthIDEdgeAgent = /** @class */ (function () {
    function AuthIDEdgeAgent(config) {
        this.config = config;
        this.authID = new authid_core_ts_1.AuthID();
    }
    /*
    * The wallet funcions
    */
    AuthIDEdgeAgent.prototype.getAddress = function (protocol, password) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, address, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.getAddress(protocol, password)];
                    case 2:
                        address = _a.sent();
                        result = { address: address, protocol: protocol.toUpperCase() };
                        responseCode = 200;
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        onError(err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.getInfo = function (protocol) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, info, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.getInfo(protocol)];
                    case 2:
                        info = _a.sent();
                        // remove the wallet object
                        delete info["wallet"];
                        result = { info: info, protocol: protocol.toUpperCase() };
                        responseCode = 200;
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        onError(err_2);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.getSeedPhrase = function (protocol, password) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, info, wallet, seedPhrase, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.authID.getInfo(protocol)];
                    case 2:
                        info = _a.sent();
                        wallet = info["wallet"];
                        return [4 /*yield*/, wallet.getMnemonic(password)];
                    case 3:
                        seedPhrase = _a.sent();
                        result = { seedPhrase: seedPhrase, protocol: protocol.toUpperCase() };
                        responseCode = 200;
                        _a.label = 4;
                    case 4:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 6];
                    case 5:
                        err_3 = _a.sent();
                        onError(err_3);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.recoverFromSeedPhrase = function (protocol, password, passphrase) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, info, wallet, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.authID.getInfo(protocol)];
                    case 2:
                        info = _a.sent();
                        wallet = info["wallet"];
                        return [4 /*yield*/, wallet.recoverFromMnemonic(passphrase, password)];
                    case 3:
                        _a.sent();
                        result = { protocol: protocol.toUpperCase() };
                        responseCode = 200;
                        _a.label = 4;
                    case 4:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 6];
                    case 5:
                        err_4 = _a.sent();
                        onError(err_4);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    /*
    * AuthID functions
    */
    AuthIDEdgeAgent.prototype.registerDID = function (protocol, password) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, did, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.registerDID(protocol, password)];
                    case 2:
                        did = _a.sent();
                        result = { did: did, protocol: protocol.toUpperCase() };
                        responseCode = 201; // created
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        onError(err_5);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.importDID = function (password, did) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, protocol, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        protocol = this.authID.getProtocolFromId(did);
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.importDID(password, did)];
                    case 2:
                        _a.sent();
                        result = { protocol: protocol.toUpperCase() };
                        responseCode = 201; // created
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_6 = _a.sent();
                        onError(err_6);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.authorizeProcessor = function (protocol, password, processorId, publicKey, sig, auth) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, processor, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.authorizeProcessor(protocol, password, processorId, publicKey, sig, auth)];
                    case 2:
                        processor = _a.sent();
                        result = { processor: processor, protocol: protocol.toUpperCase() };
                        responseCode = 201; // created
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_7 = _a.sent();
                        onError(err_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.importProcessor = function (protocol, password, processorId, processorToken, privateKey) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, processor, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.importProcessor(protocol, password, processorId, processorToken, privateKey)];
                    case 2:
                        processor = _a.sent();
                        result = { processor: processor, protocol: protocol.toUpperCase() };
                        responseCode = 200; // created
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_8 = _a.sent();
                        onError(err_8);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.revokeProcessor = function (protocol, password, processorId) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.revokeProcessor(protocol, password, processorId)];
                    case 2:
                        _a.sent();
                        result = { protocol: protocol.toUpperCase() };
                        responseCode = 200;
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_9 = _a.sent();
                        onError(err_9);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.createJwt = function (protocol, password, claims, expiresIn) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, jwt, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        result = void 0;
                        responseCode = void 0;
                        if (!!AuthIDEdgeAgent.isProtocolSupported(protocol)) return [3 /*break*/, 1];
                        result = { reason: "Unsupported protocol." };
                        responseCode = 400; // Bad request
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authID.createJwt(protocol, password, claims, expiresIn)];
                    case 2:
                        jwt = _a.sent();
                        result = { jwt: jwt, protocol: protocol.toUpperCase() };
                        responseCode = 201;
                        _a.label = 3;
                    case 3:
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 5];
                    case 4:
                        err_10 = _a.sent();
                        onError(err_10);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.verifyJwt = function (jwt, id) {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var result, responseCode, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.authID.verifyJwt(jwt, id)];
                    case 1:
                        result = _a.sent();
                        responseCode = 200;
                        onSuccess({ result: result, responseCode: responseCode });
                        return [3 /*break*/, 3];
                    case 2:
                        err_11 = _a.sent();
                        onError(err_11);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.init = function () {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var ethDriver, err_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.loadEthDriver()];
                    case 1:
                        ethDriver = _a.sent();
                        this.authID.setDriver(ETH, ETHB_DID, ethDriver);
                        onSuccess();
                        return [3 /*break*/, 3];
                    case 2:
                        err_12 = _a.sent();
                        onError(err_12);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.prototype.loadEthDriver = function () {
        var _this = this;
        return new Promise(function (onSuccess, onError) { return __awaiter(_this, void 0, void 0, function () {
            var provider, ethDriver, err_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        provider = new providers_1.JsonRpcProvider(this.config.getEthRPCHost());
                        ethDriver = new authid_eth_driver_1.EthAuthIDDriver(path_1.default.join(config_1.APP_DIR, "eth"), provider, "");
                        return [4 /*yield*/, ethDriver.init()];
                    case 1:
                        _a.sent();
                        onSuccess(ethDriver);
                        return [3 /*break*/, 3];
                    case 2:
                        err_13 = _a.sent();
                        onError(err_13);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    AuthIDEdgeAgent.isProtocolSupported = function (protocol) {
        return SUPPORTED_PROTOCOLS.indexOf(protocol.toUpperCase()) != -1;
    };
    return AuthIDEdgeAgent;
}());
exports.AuthIDEdgeAgent = AuthIDEdgeAgent;
