import OrderService from "./service";

export default {
  name: "Orders",

  async execute(context: any) {
    return OrderService.getOrders(context);
  }
};