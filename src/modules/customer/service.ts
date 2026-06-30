import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import CUSTOMER_QUERY from "./graphql";

class CustomerService {
  async getProfile(context: RuntimeContext) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: CUSTOMER_QUERY,
      variables: {
        customerAccessToken: (context as any).customerAccessToken
      }
    });
  }
}

export default new CustomerService();