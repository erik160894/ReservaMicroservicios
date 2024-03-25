import PaymentApplication from "../../application/delivery.application";

export default class BrokerController {
  constructor(private paymentApplication: PaymentApplication) {}

  async listen() {
    await this.paymentApplication.receive();
    console.log("Broker listening");
  }
}
