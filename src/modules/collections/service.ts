import ShopifyService from "../../services/shopify.service";

import COLLECTIONS_QUERY from "./graphql";

import { RuntimeContext } from "../../shared/interfaces/runtime-context";

class CollectionService {

  async getCollections(
    context: RuntimeContext
  ) {

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: COLLECTIONS_QUERY,

      variables: {

        first: context.pageSize

      }

    });

  }

}

export default new CollectionService();