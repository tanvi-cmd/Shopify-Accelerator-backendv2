import CustomerService from "./service";

export default {

  name: "Customer",

  async execute(
    context: any
  ) {

    const profile =
      await CustomerService.getProfile(
        context
      );

    const orders =
      await CustomerService.getOrders(
        context
      );

    const addresses =
      await CustomerService.getAddresses(
        context
      );

    return {

      success: true,

      module: "Customer",

      data: {

        authenticated:
          !!context.customerAccessToken,

        profile,

        orders,

        addresses

      }

    };

  }

};