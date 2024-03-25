import mongoose, { Schema, Model } from "mongoose";

class OrderModel {
  private readonly orderSchema: Schema;

  constructor() {
    this.orderSchema = new Schema({
      userId: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
      productName: {
        type: String,
        required: true,
      },
      productCount: {
        type: Number,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    });
  }

  get model(): Model<any> {
    return mongoose.model("Order", this.orderSchema);
  }
}

export default new OrderModel().model;
