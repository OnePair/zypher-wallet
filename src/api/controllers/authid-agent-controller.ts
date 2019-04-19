import { Router, Request, Response } from "express";
import { AuthIDEdgeAgent } from "../../authid-edge-agent";

export class AuthIDAgentController {
  private authIDAgent: AuthIDEdgeAgent;
  private router: Router;

  constructor(authIDAgent: AuthIDEdgeAgent) {
    this.authIDAgent = authIDAgent;
    this.router = Router();
    this.createRoutes();
  }

  private createRoutes(): void {
    this.router.get("/test", (req: Request, res: Response) => {
      res.send("AuthID agent");
    });

    this.router.post("/registerDID", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response = await this.authIDAgent.registerDID(req.body["protocol"],
            req.body["password"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }
      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/registerName", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body)
          || !("name" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response = await this.authIDAgent.registerName(req.body["protocol"],
            req.body["password"], req.body["name"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }
      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/importDID", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("did" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.importDID(req.body["password"], req.body["did"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }
      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/authorizeProcessor", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body) ||
          !("processorId" in req.body) || !("publicKey" in req.body) ||
          !("sig" in req.body) || !("auth" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.authorizeProcessor(req.body["protocol"],
              req.body["password"], req.body["processorId"], req.body["publicKey"],
              req.body["sig"], req.body["auth"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }

      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/importProcessor", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body) ||
          !("processorId" in req.body) || !("processorToken" in req.body) ||
          !("privateKey" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.importProcessor(req.body["protocol"],
              req.body["password"], req.body["processorId"],
              req.body["processorToken"], req.body["privateKey"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }

      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/revokeProcessor", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body) ||
          !("processorId" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.revokeProcessor(req.body["protocol"],
              req.body["password"], req.body["processorId"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }

      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/createJwt", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body) ||
          !("claims" in req.body) || !("expiresIn" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.createJwt(req.body["protocol"],
              req.body["password"], req.body["claims"], req.body["exipiresIn"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }

      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/verifyJwt", async (req: Request, res: Response) => {
      try {
        if (!("jwt" in req.body) || !("id" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response
            = await this.authIDAgent.verifyJwt(req.body["jwt"], req.body["id"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }
      } catch (err) {
        res.status(500);
        res.send({ err: err });
      }
    });

    this.router.post("/createAuthRequest", async (req: Request, res: Response) => {
      try {
        if (!("id" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response = await this.authIDAgent.createAuthRequest(req.body["id"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }

      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/signAuthRequest", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("authRequest" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.signAuthRequest(req.body["password"],
              req.body["authRequest"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }

      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/verifyAuthResponse", async (req: Request, res: Response) => {
      try {
        if (!("authResponse" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.verifyAuthResponse(req.body["authResponse"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }

      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
