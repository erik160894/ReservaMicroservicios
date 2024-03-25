import BrokerRepository from "../domain/broker.repository";
import { STATUS } from "../domain/store";
import StoreRepository from "../domain/store.repository";

export default class StoreApplication {
  readonly repositoryStore: StoreRepository;
  readonly repositoryBroker: BrokerRepository;

  constructor(
    repositoryStore: StoreRepository,
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryStore = repositoryStore;
    this.repositoryBroker = repositoryBroker;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    return this.repositoryStore.update(transactionId, status);
  }

  async receive() {
    await this.repositoryBroker.receive();
  }
}
