import Store, { STATUS } from "../domain/store";
import StoreRepository from "../domain/store.repository";
import Model from "./models/store.model";

export default class StoreInfrastructure implements StoreRepository {
  async insert(store: Store): Promise<Store> {
    await Model.create(store);
    return store;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}
