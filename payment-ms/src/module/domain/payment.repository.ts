import Payment, { STATUS } from "./payment";

export default interface PaymentRepository {
  insert(order: Payment): Promise<Payment>;
  update(transactionId: string, status: STATUS): Promise<string>;
}
