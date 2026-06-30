import ShopifyService from "../../services/shopify.service";
import { RuntimeContext } from "../../shared/interfaces/runtime-context";
import { MENU_QUERY } from "./graphql";

class MenuService {
  async getMainMenu(context: RuntimeContext) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: MENU_QUERY,
      variables: {
        handle: "main-menu"
      }
    });
  }

  async getFooterMenu(context: RuntimeContext) {
    return ShopifyService.execute({
      api: "storefront",
      context,
      query: MENU_QUERY,
      variables: {
        handle: "footer"
      }
    });
  }
}

export default new MenuService();