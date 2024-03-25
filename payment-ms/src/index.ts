import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import BrokerBootstrap from "./bootstrap/broker.bootstrap";
import BrokerController from "./module/interfaces/broker/broker.controller";
import app from "./app";
import PaymentInfrastructure from "./module/infrastructure/payment.infrastructure";
import BrokerInfrastructure from "./module/infrastructure/broker.infrastructure";
import PaymentApplication from "./module/application/payment.application";

const paymentInfrastructure = new PaymentInfrastructure();
const brokerInfrastructure = new BrokerInfrastructure(paymentInfrastructure);
const paymentApplication = new PaymentApplication(
  paymentInfrastructure,
  brokerInfrastructure
);

(async () => {
  try {
    const listPromises = [];

    const serverBootstrap = new ServerBootstrap(app);
    const databaseBootstrap = new DatabaseBootstrap();
    const brokerBootstrap = new BrokerBootstrap();
    const brokerController = new BrokerController(paymentApplication);

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
