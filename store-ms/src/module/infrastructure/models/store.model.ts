import mongoose, { Schema, Model } from "mongoose";

class StoreModel {
  private readonly storeSchema: Schema;

  constructor() {
    this.storeSchema = new Schema({
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
    return mongoose.model("Store", this.storeSchema);
  }
}

export default new StoreModel().model;
