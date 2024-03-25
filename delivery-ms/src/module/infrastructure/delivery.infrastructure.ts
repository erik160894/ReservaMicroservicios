import Delivery, { STATUS } from "../domain/delivery";
import DeliveryRepository from "../domain/delivery.repository";
import Model from "./models/delivery.model";

export default class DeliveryInfrastructure implements DeliveryRepository {
  async insert(delivery: Delivery): Promise<Delivery> {
    await Model.create(delivery);
    return delivery;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}
