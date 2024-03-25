import express, { Application, Request, Response, NextFunction } from "express";
import axios, { AxiosRequestConfig } from "axios";
import { ErrorsService } from "./services/errors.service";
import { authentication } from "./middlewares/authentication";
import AppService from "./services/app.service";

type middleware = (req: Request, res: Response, next: NextFunction) => void;

interface Route {
  origin: string;
  target: string;
  method: "POST" | "GET" | "PUT" | "DELETE";
  middlewares: middleware[];
}

type Routes = Route[];

class App {
  readonly expressApp: Application;

  private readonly routes: Routes = [
    {
      origin: "/api/order",
      target: `${AppService.PATH_ORDER}/order`,
      method: "POST",
      middlewares: [authentication],
    },
    {
      origin: "/api/auth/register",
      target: `${AppService.PATH_AUTH}/auth/register`,
      method: "POST",
      middlewares: [],
    },
    {
      origin: "/api/auth/login",
      target: `${AppService.PATH_AUTH}/auth/login`,
      method: "POST",
      middlewares: [],
    },
    {
      origin: "/api/auth/get-new-access-token",
      target: `${AppService.PATH_AUTH}/auth/get-new-access-token`,
      method: "POST",
      middlewares: [],
    },
  ];

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
    this.routes.forEach((route) => {
      this.expressApp.post(
        route.origin,
        ...route.middlewares,
        this.execute(route)
      );
    });
    this.expressApp.get("/", (req: Request, res: Response) => {
      res.send("All's ok");
    });
  }

  mountErrors() {
    this.expressApp.use(ErrorsService.notFound);
    this.expressApp.use(ErrorsService.generic);
  }

  execute(route: Route) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const request: AxiosRequestConfig<any> = {
        method: route.method,
        url: route.target,
        responseType: "json",
        data: { ...req.body },
      };

      if (res.locals.userId) {
        request.data.userId = res.locals.userId;
      }

      try {
        const result = await axios(request);
        res.json(result.data);
      } catch (error) {
        res.json({ error });
      }
    };
  }
}

export default new App().expressApp;
