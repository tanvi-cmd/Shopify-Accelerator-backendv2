import ShopifyService from "../../services/shopify.service";

import SEARCH_QUERY from "./graphql";

class SearchService {

    async search(config: any) {

        return ShopifyService.execute({

            api: "storefront",

            config,

            query: SEARCH_QUERY,

            variables: {

                query:

                    config.searchQuery || "",

                first:

                    config.pageSize || 20

            }

        });

    }

}

export default new SearchService();