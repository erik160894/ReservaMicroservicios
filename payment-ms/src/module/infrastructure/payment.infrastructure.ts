import Payment, { STATUS } from "../domain/payment";
import PaymentRepository from "../domain/payment.repository";
import Model from "./models/payment.model";

export default class PaymentInfrastructure implements PaymentRepository {
  async insert(payment: Payment): Promise<Payment> {
    await Model.create(payment);
    return payment;
  }

  async update(transactionId: string, status: STATUS): Promise<string> {
    await Model.findOneAndUpdate({ transactionId }, { status });
    return status;
  }
}
