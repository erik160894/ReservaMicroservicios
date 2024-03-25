import amqp from "amqplib";

export default class ReceiveMessageService {
  static async accepted(
    channel: amqp.Channel,
    queueName: string,
    cb: (message: any) => void
  ) {
    await channel.assertQueue(queueName, { durable: true });
    channel.consume(queueName, (message: any) => cb(message), {
      noAck: false,
    });
  }
}
