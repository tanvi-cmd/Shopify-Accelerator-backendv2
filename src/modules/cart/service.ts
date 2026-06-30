import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import CREATE_CART from "./graphql";

class CartService {
  async createCart(context: RuntimeContext) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: CREATE_CART
    });
  }
}

export default new CartService();