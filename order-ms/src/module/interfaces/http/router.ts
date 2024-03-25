import express from "express";
import Controller from "./controller";
import OrderApplication from "../../application/order.application";
import OrderInfrastructure from "../../infrastructure/order.infrastructure";
import { ErrorsService } from "../../../services/errors.service";
import ValidatorsService from "../../../services/validators.service";
import { orderSchema } from "./order.schema";
import BrokerInfrastructure from "../../infrastructure/broker.infrastructure";

const orderInfrastructure = new OrderInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(orderInfrastructure);
const application = new OrderApplication(
  orderInfrastructure,
  brokerInfrastructure
);
const controller = new Controller(application);

class Router {
  readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post(
      "/",
      ValidatorsService.validate(orderSchema.INSERT),
      ErrorsService.catchError(controller.insert)
    );
  }
}

export default new Router().router;
