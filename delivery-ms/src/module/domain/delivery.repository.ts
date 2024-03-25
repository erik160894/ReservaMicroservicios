import Delivery, { STATUS } from "./delivery";

export default interface DeliveryRepository {
  insert(order: Delivery): Promise<Delivery>;
  update(transactionId: string, status: STATUS): Promise<string>;
}
