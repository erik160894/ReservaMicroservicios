import { Request, Response } from "express";
import OrderApplication from "../../application/order.application";
import Order from "../../domain/order";

export default class {
  application: OrderApplication;

  constructor(readonly app: OrderApplication) {
    this.application = app;
    this.insert = this.insert.bind(this);
  }

  async insert(req: Request, res: Response) {
    const { userId, productId, productName, productCount, transactionId } =
      req.body;

    const order = new Order(
      userId,
      productId,
      productName,
      productCount,
      transactionId,
      "PENDING"
    );

    const orderInserted = await this.application.create(order);

    res.json(orderInserted);
  }
}
