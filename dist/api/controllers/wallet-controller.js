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
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var WalletController = /** @class */ (function () {
    function WalletController(authIDAgent) {
        this.authIDAgent = authIDAgent;
        this.router = express_1.Router();
        this.createRoutes();
    }
    WalletController.prototype.createRoutes = function () {
        var _this = this;
        this.router.get("/test", function (req, res) {
            res.send("Zypher Wallet");
        });
        /*
        * ALL functions are posts they create or/and get data.
        */
        this.router.post("/getAddress", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(!("password" in req.body) || !("protocol" in req.body))) return [3 /*break*/, 1];
                        res.status(400);
                        res.send({ reason: "Invalid parameters" });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authIDAgent.getAddress(req.body["protocol"], req.body["password"])];
                    case 2:
                        response = _a.sent();
                        res.status(response["responseCode"]);
                        res.send(response["result"]);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        res.status(500);
                        res.send({ err: err_1.toString() });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/getInfo", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!!("protocol" in req.body)) return [3 /*break*/, 1];
                        res.status(400);
                        res.send({ reason: "Invalid parameters" });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authIDAgent.getInfo(req.body["protocol"])];
                    case 2:
                        response = _a.sent();
                        res.status(response["responseCode"]);
                        res.send(response["result"]);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        res.status(500);
                        res.send({ err: err_2.toString() });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/getPublicKeys", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(!("protocol" in req.body) || !("password" in req.body))) return [3 /*break*/, 1];
                        res.status(400);
                        res.send({ reason: "Invalid parameters" });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authIDAgent.getPublicKeys(req.body["protocol"], req.body["password"])];
                    case 2:
                        response = _a.sent();
                        res.status(response["responseCode"]);
                        res.send(response["result"]);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        res.status(500);
                        res.send({ err: err_3.toString() });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/getSeedPhrase", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(!("password" in req.body) || !("protocol" in req.body))) return [3 /*break*/, 1];
                        res.status(400);
                        res.send({ reason: "Invalid parameters" });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authIDAgent.getSeedPhrase(req.body["protocol"], req.body["password"])];
                    case 2:
                        response = _a.sent();
                        res.status(response["responseCode"]);
                        res.send(response["result"]);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        res.status(500);
                        res.send({ err: err_4.toString() });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        this.router.post("/recoverFromSeedPhrase", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        if (!(!("password" in req.body) ||
                            !("protocol" in req.body) ||
                            !("phrase" in req.body))) return [3 /*break*/, 1];
                        res.status(400);
                        res.send({ reason: "Invalid parameters" });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.authIDAgent.recoverFromSeedPhrase(req.body["protocol"], req.body["password"], req.body["phrase"])];
                    case 2:
                        response = _a.sent();
                        res.status(response["responseCode"]);
                        res.send(response["result"]);
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_5 = _a.sent();
                        res.status(500);
                        res.send({ err: err_5.toString() });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    };
    WalletController.prototype.getRouter = function () {
        return this.router;
    };
    return WalletController;
}());
exports.WalletController = WalletController;
