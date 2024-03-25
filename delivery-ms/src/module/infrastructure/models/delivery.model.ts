import mongoose, { Schema, Model } from "mongoose";

class DeliveryModel {
  private readonly deliverySchema: Schema;

  constructor() {
    this.deliverySchema = new Schema({
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
    return mongoose.model("Delivery", this.deliverySchema);
  }
}

export default new DeliveryModel().model;
