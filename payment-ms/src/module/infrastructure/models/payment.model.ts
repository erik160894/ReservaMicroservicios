import mongoose, { Schema, Model } from "mongoose";

class PaymentModel {
  private readonly paymentSchema: Schema;

  constructor() {
    this.paymentSchema = new Schema({
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
    return mongoose.model("Payment", this.paymentSchema);
  }
}

export default new PaymentModel().model;
