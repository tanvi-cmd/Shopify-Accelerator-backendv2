import ShopifyService from "../../services/shopify.service";

import PRODUCTS_QUERY from "./graphql";

import { RuntimeContext } from "../../shared/interfaces/runtime-context";

class ProductService {

  async getProducts(
    context: RuntimeContext
  ) {

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: PRODUCTS_QUERY,

      variables: {

        first: context.pageSize

      }

    });

  }

}

export default new ProductService();