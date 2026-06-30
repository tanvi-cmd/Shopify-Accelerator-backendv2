import ShopifyService from "../../services/shopify.service";

import COLLECTIONS_QUERY from "./graphql";

class CollectionService {

    async getCollections(config: any) {

        return ShopifyService.execute({

            api: "storefront",

            config,

            query: COLLECTIONS_QUERY,

            variables: {

                first:
                    config.pageSize || 20

            }

        });

    }

}

export default new CollectionService();