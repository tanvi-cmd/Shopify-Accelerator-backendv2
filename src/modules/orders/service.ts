import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";

import {
  ORDERS_QUERY,
  ORDER_BY_ID_QUERY
} from "./graphql";

class OrderService {

  private normalizeOrderId(
    orderId: string
  ) {

    if (
      orderId.startsWith(
        "gid://shopify/Order/"
      )
    ) {
      return orderId;
    }

    return `gid://shopify/Order/${orderId}`;

  }

  async getOrders(
    context: RuntimeContext
  ) {

    return ShopifyService.execute({

      api: "admin",

      context,

      query: ORDERS_QUERY,

      variables: {

        first: context.pageSize || 10,

        query:
          (context as any).orderQuery ||
          undefined

      }

    });

  }

  async getOrder(
    context: RuntimeContext
  ) {

    const orderId =
      (context as any).orderId;

    if (!orderId) {

      return {

        success: false,

        status: 400,

        duration: 0,

        error: "orderId is required."

      };

    }

    return ShopifyService.execute({

      api: "admin",

      context,

      query: ORDER_BY_ID_QUERY,

      variables: {

        id: this.normalizeOrderId(
          orderId
        )

      }

    });

  }

}

export default new OrderService();