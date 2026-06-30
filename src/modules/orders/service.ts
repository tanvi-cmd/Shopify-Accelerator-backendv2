import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import ORDERS_QUERY from "./graphql";

class OrderService {
  async getOrders(context: RuntimeContext) {
    return ShopifyService.execute({
      api: "admin",
      context,
      query: ORDERS_QUERY,
      variables: {
        first: context.pageSize || 10
      }
    });
  }
}

export default new OrderService();