"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var authid_core_ts_1 = require("authid-core-ts");
var electron_prompt_1 = __importDefault(require("electron-prompt"));
var AuthIDEdgeAgent = /** @class */ (function () {
    function AuthIDEdgeAgent() {
        this.authID = new authid_core_ts_1.AuthID();
    }
    AuthIDEdgeAgent.prototype.loadAuthIDDrivers = function () {
    };
    AuthIDEdgeAgent.prototype.confirm = function (title, message) {
        electron_prompt_1.default({
            title: title,
            label: message,
            inputAttrs: {
                type: "password"
            },
            resizable: true
        }).then(function (result) {
            if (result == null) {
                console.log("User cancelled.");
            }
            else {
                console.log("Result:", result);
            }
        });
    };
    return AuthIDEdgeAgent;
}());
exports.AuthIDEdgeAgent = AuthIDEdgeAgent;
