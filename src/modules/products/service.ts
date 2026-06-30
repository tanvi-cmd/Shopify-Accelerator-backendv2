import ShopifyService from "../../services/shopify.service";

import PRODUCTS_QUERY from "./graphql";

import {
  ProductRequest,
  ProductsResponse
} from "./types";

class ProductService {

  async getProducts(
    config: ProductRequest
  ) {

    return ShopifyService.execute<ProductsResponse>({

      api: "storefront",

      config,

      query: PRODUCTS_QUERY,

      variables: {

        first:
          config.pageSize

      }

    });

  }

}

export default new ProductService();