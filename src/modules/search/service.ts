import ShopifyService from "../../services/shopify.service";

import SEARCH_QUERY from "./graphql";

import { RuntimeContext } from "../../shared/interfaces/runtime-context";

class SearchService {

  async search(
    context: RuntimeContext
  ) {

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: SEARCH_QUERY,

      variables: {

        query: context.searchQuery,

        first: context.pageSize

      }

    });

  }

}

export default new SearchService();