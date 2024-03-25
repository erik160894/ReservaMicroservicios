import { Bootstrap } from "./bootstrap";
import EnvironmentVariables from "../services/app.service";
import amqp from "amqplib";

let channel: amqp.Channel;

export default class extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise(async (resolve, reject) => {
      const HOST = EnvironmentVariables.RABBITMQ_HOST;

      try {
        const connection = await amqp.connect(`amqp://${HOST}`);
        channel = await connection.createChannel();
        resolve(true);
        console.log("Connected to RabbitMQ");
      } catch (error) {
        reject(error);
      }
    });
  }

  static get Channel(): amqp.Channel {
    return channel;
  }
}
