import OrdenApplication from "../../application/order.application";

export default class BrokerController {
  constructor(private orderApplication: OrdenApplication) {}

  async listen() {
    await this.orderApplication.receive();
    console.log("Broker listening");
  }
}
