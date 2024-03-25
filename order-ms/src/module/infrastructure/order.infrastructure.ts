import Order, { STATUS } from "../domain/order";
import OrderRepository from "../domain/order.repository";
import Model from "./models/order.model";

export default class OrderInfrastructure implements OrderRepository {
  async insert(order: Order): Promise<Order> {
    await Model.create(order);
    return order;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}
