import BrokerRepository from "../domain/broker.repository";
import { STATUS } from "../domain/delivery";
import DeliveryRepository from "../domain/delivery.repository";

export default class DeliveryApplication {
  readonly repositoryDelivery: DeliveryRepository;
  readonly repositoryBroker: BrokerRepository;

  constructor(
    repositoryDelivery: DeliveryRepository,
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryDelivery = repositoryDelivery;
    this.repositoryBroker = repositoryBroker;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    return this.repositoryDelivery.update(transactionId, status);
  }

  async receive() {
    await this.repositoryBroker.receive();
  }
}
