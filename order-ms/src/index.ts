import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import app from "./app";
import BrokerController from "./module/interfaces/broker/broker.controller";
import OrderInfrastructure from "./module/infrastructure/order.infrastructure";
import BrokerInfrastructure from "./module/infrastructure/broker.infrastructure";
import OrderApplication from "./module/application/order.application";

const orderInfrastructure = new OrderInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(orderInfrastructure);
const orderApplication = new OrderApplication(
  orderInfrastructure,
  brokerInfrastructure
);

(async () => {
  try {
    const listPromises = [];

    const serverBootstrap = new ServerBootstrap(app);
    const databaseBootstrap = new DatabaseBootstrap();
    const brokerBootstrap = new BrokerBootstrap();
    const brokerController = new BrokerController(orderApplication);

    listPromises.push(serverBootstrap.initialize());
    listPromises.push(databaseBootstrap.initialize());
    listPromises.push(brokerBootstrap.initialize());

    await Promise.all(listPromises);
    await brokerController.listen();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
