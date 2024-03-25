import BrokerRepository from "../domain/broker.repository";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import EnvironmentVariables from "../../services/app.service";

import Delivery from "../domain/delivery";
import DeliveryInfrastructure from "./delivery.infrastructure";
import ReceiveMessageService from "./services/receive-messages.service";
import UtilsBrokerService from "./services/utils-broker.service";

export default class BrokerInfrastructure implements BrokerRepository {
  constructor(
    private readonly deliveryInfrastructure: DeliveryInfrastructure
  ) {}

  async sendError(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ERROR_EVENT;
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    channel.publish(
      exchangeName,
      "delivery.error",
      Buffer.from(JSON.stringify(message))
    );
  }

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ORDER_COMPLETED_EVENT;

    await channel.assertExchange(exchangeName, "fanout", { durable: true });
    channel.publish(exchangeName, "", Buffer.from(JSON.stringify(message)));
  }

  async receive(): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_STORED_EVENT;

    await ReceiveMessageService.accepted(
      channel,
      queueName,
      this.consumerAccept.bind(this)
    );
  }

  async consumerAccept(message: any) {
    const content = JSON.parse(message.content.toString());

    const delivery = new Delivery(
      content.userId,
      content.productId,
      content.productName,
      content.productCount,
      content.transactionId,
      "PENDING"
    );

    /*await this.deliveryInfrastructure.insert(delivery); */
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    //this.send(delivery);
    this.sendError(delivery);
  }
}
