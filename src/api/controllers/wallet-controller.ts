import { Router, Request, Response } from "express";
import { AuthIDEdgeAgent } from "../../authid-edge-agent";

export class WalletController {
  private authIDAgent: AuthIDEdgeAgent;
  private router: Router;

  constructor(authIDAgent: AuthIDEdgeAgent) {
    this.authIDAgent = authIDAgent;
    this.router = Router();
    this.createRoutes();
  }

  private createRoutes(): void {
    this.router.get("/test", (req: Request, res: Response) => {
      res.send("Zypher Wallet");
    });

    /*
    * ALL functions are posts they create or/and get data.
    */


    this.router.post("/getAddress", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response = await this.authIDAgent.getAddress(req.body["protocol"],
            req.body["password"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }
      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/getInfo", async (req: Request, res: Response) => {
      try {
        if (!("protocol" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response = await this.authIDAgent.getInfo(req.body["protocol"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }
      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/getSeedPhrase", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) || !("protocol" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.getSeedPhrase(req.body["protocol"],
              req.body["password"]);

          res.status(response["responseCode"]);
          res.send(response["result"]);
        }
      } catch (err) {
        res.status(500);
        res.send({ err: err.toString() });
      }
    });

    this.router.post("/recoverFromSeedPhrase", async (req: Request, res: Response) => {
      try {
        if (!("password" in req.body) ||
          !("protocol" in req.body) ||
          !("phrase" in req.body)) {
          res.status(400);
          res.send({ reason: "Invalid parameters" });
        } else {
          let response =
            await this.authIDAgent.recoverFromSeedPhrase(req.body["protocol"],
              req.body["password"], req.body["phrase"]);

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
