import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import CUSTOMER_LOGIN from "./graphql";

class AuthService {
  async login(context: RuntimeContext) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: CUSTOMER_LOGIN,
      variables: {
        email: (context as any).email,
        password: (context as any).password
      }
    });
  }
}

export default new AuthService();