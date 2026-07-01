import OrderService from "./service";

export default {

  name: "Orders",

  async execute(
    context: any
  ) {

    if (context.orderId) {

      return OrderService.getOrder(
        context
      );

    }

    return OrderService.getOrders(
      context
    );

  }

};