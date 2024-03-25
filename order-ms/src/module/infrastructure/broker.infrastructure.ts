import BrokerRepository from "../domain/broker.repository";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import EnvironmentVariables from "../../services/app.service";
import ReceiveMessageService from "./services/receive-messages.service";
import OrderInfrastructure from "./order.infrastructure";
import UtilsBrokerService from "./services/utils-broker.service";

export default class BrokerInfrastructure implements BrokerRepository {
  constructor(private readonly orderInfrastructure: OrderInfrastructure) {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_CREATED_EVENT;
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async receive(): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ORDER_COMPLETED_EVENT;
    const exchangeType = "fanout";

    await ReceiveMessageService.confirmedOrder(
      channel,
      this.consumerOrderConfirmed.bind(this),
      exchangeName,
      exchangeType
    );

    await ReceiveMessageService.rejected(
      channel,
      this.consumerReject.bind(this),
      "*.error"
    );
  }

  async consumerOrderConfirmed(message: any) {
    const content = JSON.parse(message.content.toString());

    console.log("Order confirmed: ", content);

    await this.orderInfrastructure.update(content.transactionId, "COMPLETED");

    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());

    await this.orderInfrastructure.update(content.transactionId, "CANCELLED");
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
  }
}
