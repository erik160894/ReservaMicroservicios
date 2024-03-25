import BrokerRepository from "../domain/broker.repository";
import Payment, { STATUS } from "../domain/payment";
import PaymentRepository from "../domain/payment.repository";
import EnvironmentVariables from "../../services/app.service";
export default class PaymentApplication {
  readonly repositoryPayment: PaymentRepository;
  readonly repositoryBroker: BrokerRepository;

  constructor(
    repositoryPayment: PaymentRepository,
    repositoryBroker: BrokerRepository
  ) {
    this.repositoryPayment = repositoryPayment;
    this.repositoryBroker = repositoryBroker;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    return this.repositoryPayment.update(transactionId, status);
  }

  async receive() {
    await this.repositoryBroker.receive();
  }
}
