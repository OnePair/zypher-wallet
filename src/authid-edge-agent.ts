import { Config, APP_DIR } from "./config";
import { AuthID, AuthIDDriver } from "authid-core-ts";
import { EthAuthIDDriver } from "authid-eth-driver";
import { JsonRpcProvider } from "ethers/providers";

import path from "path";

const ETH = "ETH";
const ETHB_DID = "ethb";
const SUPPORTED_PROTOCOLS = [ETH];

/*
* TODO: Create an interface for an authid wallet (authid-core).
*/

export class AuthIDEdgeAgent {
  private config: Config;
  private authID: AuthID;

  constructor(config: Config) {
    this.config = config;
    this.authID = new AuthID();
  }

  /*
  * The wallet funcions
  */
  public getAddress(protocol: string, password: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let address = await this.authID.getAddress(protocol, password);

          result = { address: address, protocol: protocol.toUpperCase() }
          responseCode = 200;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public getInfo(protocol: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let info = await this.authID.getInfo(protocol);

          // remove the wallet object
          delete info["wallet"];

          result = { info: info, protocol: protocol.toUpperCase() }
          responseCode = 200;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public getPublicKeys(protocol: string, password: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let publicKeys = await this.authID.getPublicKeys(protocol, password);

          result = { publicKeys: publicKeys, protocol: protocol.toUpperCase() }
          responseCode = 200;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  };

  public getSeedPhrase(protocol: string, password: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let info = await this.authID.getInfo(protocol);
          let wallet = info["wallet"];
          let seedPhrase = await wallet.getMnemonic(password);

          result = { seedPhrase: seedPhrase, protocol: protocol.toUpperCase() };
          responseCode = 200;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public recoverFromSeedPhrase(protocol: string,
    password: string, passphrase: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let info = await this.authID.getInfo(protocol);
          let wallet = info["wallet"];
          await wallet.recoverFromMnemonic(passphrase, password);

          result = { protocol: protocol.toUpperCase() };
          responseCode = 200;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  /*
  * AuthID functions
  */

  public registerDID(protocol: string, password: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let did = await this.authID.registerDID(protocol, password);

          result = { did: did, protocol: protocol.toUpperCase() };
          responseCode = 201; // created
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public registerName(protocol: string, password: string, name: string): Promise<object> {
    return new Promise<object>(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let txHash = await this.authID.registerName(protocol, password, name);

          result = { txHash: txHash, protocol: protocol.toUpperCase() };
          responseCode = 201; // created
        }
        onSuccess({ result: result, responseCode: responseCode });

      } catch (err) {
        onError(err);
      }
    });
  }

  public importDID(password: string, did: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        let protocol = this.authID.getProtocolFromId(did);

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          await this.authID.importDID(password, did);

          result = { protocol: protocol.toUpperCase() };
          responseCode = 200;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public authorizeProcessor(protocol: string, password: string, processorId: string,
    publicKey: string, sig: boolean, auth: boolean): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let processor = await this.authID.authorizeProcessor(protocol, password,
            processorId, publicKey, sig, auth);
          result = { processor: processor, protocol: protocol.toUpperCase() };
          responseCode = 201; // created
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public importProcessor(protocol: string, password: string, processorId: string,
    processorToken: string, privateKey: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let processor = await this.authID.importProcessor(protocol, password,
            processorId, processorToken, privateKey);
          result = { processor: processor, protocol: protocol.toUpperCase() };
          responseCode = 200; // created
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public revokeProcessor(protocol: string, password: string, processorId: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          await this.authID.revokeProcessor(protocol, password, processorId);

          result = { protocol: protocol.toUpperCase() };
          responseCode = 200;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public createJwt(protocol: string, password: string,
    claims: object, expiresIn: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result: object;
        let responseCode: number;

        if (!AuthIDEdgeAgent.isProtocolSupported(protocol)) {
          result = { reason: "Unsupported protocol." };
          responseCode = 400; // Bad request
        } else {
          let jwt = await this.authID.createJwt(protocol, password, claims, expiresIn);

          result = { jwt: jwt, protocol: protocol.toUpperCase() };
          responseCode = 201;
        }

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public verifyJwt(jwt: string, id: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result = await this.authID.verifyJwt(jwt, id);
        let responseCode = 200;

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public createAuthRequest(id: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let authRequest = await this.authID.createAuthRequest(id);
        let responseCode = 201;

        let result = { authRequest: authRequest };

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public signAuthRequest(password: string, authRequest: object): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let response = await this.authID.signAuthRequest(password, authRequest);
        let responseCode = 201;

        let result = { authResponse: response };

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public verifyAuthResponse(authResponse: string): Promise<object> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let result = await this.authID.verifyAuthResponse(authResponse);
        let responseCode = 200;

        onSuccess({ result: result, responseCode: responseCode });
      } catch (err) {
        onError(err);
      }
    });
  }

  public init(): Promise<void> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let ethDriver = await this.loadEthDriver();

        this.authID.setDriver(ETH, ETHB_DID, ethDriver);

        onSuccess();
      } catch (err) {
        onError(err);
      }
    });
  }

  private loadEthDriver(): Promise<AuthIDDriver> {
    return new Promise(async (onSuccess: Function, onError: Function) => {
      try {
        let provider: any = new JsonRpcProvider(this.config.getEthRPCHost());
        let ethDriver = new EthAuthIDDriver(path.join(APP_DIR, "eth"),
          provider, this.config.getIpfsHost(), this.config.getEthNetwork());
        await ethDriver.init();

        onSuccess(ethDriver);
      } catch (err) {
        onError(err);
      }
    });
  }

  private static isProtocolSupported(protocol: string): boolean {
    return SUPPORTED_PROTOCOLS.indexOf(protocol.toUpperCase()) != -1;
  }

}
