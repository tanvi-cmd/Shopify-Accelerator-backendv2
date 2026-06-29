import {
  SHOP_QUERY,
  PRODUCTS_QUERY,
  COLLECTIONS_QUERY
} from "./explorer.queries";

import { DynamicStorefrontClient }
  from "../../providers/shopify/dynamic-storefront.client";

export class ExplorerService {

  async connect(
    store: string,
    storefrontToken: string
  ) {

    const client =
      DynamicStorefrontClient.create(
        store,
        storefrontToken
      );

    // const search = await client.request(
    //   SEARCH_QUERY,
    //   {
    //     query: searchQuery
    //   }
    // );

    const safeRequest = async (
      query: string,
      name: string
    ) => {
      try {
        return await client.request(query);
      } catch (error: any) {
        return {
          error: true,
          source: name,
          message: error.message
        };
      }
    };

    return {
      shop: await safeRequest(
        SHOP_QUERY,
        "shop"
      ),

      products: await safeRequest(
        PRODUCTS_QUERY,
        "products"
      ),

      collections: await safeRequest(
        COLLECTIONS_QUERY,
        "collections"
      )
    };
  }
}