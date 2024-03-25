import express, { Application, Request, Response } from "express";
import router from "./module/interfaces/http/router";
import { ErrorsService } from "./services/errors.service";

class App {
  readonly expressApp: Application;

  constructor() {
    this.expressApp = express();
    this.middlewares();
    this.mountRoutes();
    this.mountErrors();
  }

  middlewares() {
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: false }));
  }

  mountRoutes() {
    this.expressApp.use("/auth", router);
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("All's ok");
    });
  }

  mountErrors() {
    this.expressApp.use(ErrorsService.notFound);
    this.expressApp.use(ErrorsService.generic);
  }
}

export default new App().expressApp;
