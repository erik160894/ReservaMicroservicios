import amqp from "amqplib";
import EnviromentVariables from "../../../services/app.service";
export default class ReceiveMessageService {
  static async confirmedOrder(
    channel: amqp.Channel,
    cb: (message: any) => void,
    exchangeName: string,
    exchangeType: string
  ) {
    await channel.assertExchange(exchangeName, exchangeType, { durable: true });

    const assertQueue = await channel.assertQueue("", { exclusive: true });
    channel.bindQueue(assertQueue.queue, exchangeName, exchangeType);

    channel.consume(assertQueue.queue, (message: any) => cb(message), {
      noAck: false,
    });
  }

  static async rejected(
    channel: amqp.Channel,
    cb: (message: any) => void,
    routingKey: string
  ) {
    await channel.assertExchange(
      EnviromentVariables.EXCHANGE_ERROR_EVENT,
      "topic",
      { durable: true }
    );

    const assertQueue = await channel.assertQueue("", { exclusive: true });
    channel.bindQueue(
      assertQueue.queue,
      EnviromentVariables.EXCHANGE_ERROR_EVENT,
      routingKey
    );

    channel.consume(assertQueue.queue, (message: any) => cb(message), {
      noAck: false,
    });
  }
}
