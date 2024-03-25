import Store, { STATUS } from "./store";

export default interface StoreRepository {
  insert(order: Store): Promise<Store>;
  update(transactionId: string, status: STATUS): Promise<string>;
}
