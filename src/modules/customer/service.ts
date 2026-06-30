import ShopifyService from "../../services/shopify.service";

import CUSTOMER_QUERY from "./graphql";

class CustomerService {

  async getProfile(config: any) {

    return ShopifyService.execute({

      api: "storefront",

      config,

      query: CUSTOMER_QUERY,

      variables: {

        customerAccessToken:
          config.customerAccessToken

      }

    });

  }

}

export default new CustomerService();