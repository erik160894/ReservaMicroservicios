import BrokerRepository from "../domain/broker.repository";
import BrokerBootstrap from "../../bootstrap/broker.bootstrap";
import EnvironmentVariables from "../../services/app.service";

import Store from "../domain/store";
import StoreInfrastructure from "./store.infrastructure";
import ReceiveMessageService from "./services/receive-messages.service";
import UtilsBrokerService from "./services/utils-broker.service";

export default class BrokerInfrastructure implements BrokerRepository {
  constructor(private readonly storeInfrastructure: StoreInfrastructure) {}

  async send(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_STORED_EVENT;
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)));
  }

  async sendError(message: any): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const exchangeName = EnvironmentVariables.EXCHANGE_ERROR_EVENT;
    await channel.assertExchange(exchangeName, "topic", { durable: true });
    channel.publish(
      exchangeName,
      "store.error",
      Buffer.from(JSON.stringify(message))
    );
  }

  async receive(): Promise<any> {
    const channel = BrokerBootstrap.Channel;
    const queueName = EnvironmentVariables.QUEUE_ORDER_PAID_EVENT;

    await ReceiveMessageService.accepted(
      channel,
      queueName,
      this.consumerAccept.bind(this)
    );

    await ReceiveMessageService.rejected(
      channel,
      this.consumerReject.bind(this),
      "delivery.error"
    );
  }

  async consumerAccept(message: any) {
    const content = JSON.parse(message.content.toString());

    const store = new Store(
      content.userId,
      content.productId,
      content.productName,
      content.productCount,
      content.transactionId,
      "PENDING"
    );

    await this.storeInfrastructure.insert(store);
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
    this.send(store);
    //this.sendError(store);
  }

  async consumerReject(message: any) {
    const content = JSON.parse(message.content.toString());

    await this.storeInfrastructure.update(content.transactionId, "CANCELLED");
    UtilsBrokerService.confirmMessage(BrokerBootstrap.Channel, message);
  }
}
