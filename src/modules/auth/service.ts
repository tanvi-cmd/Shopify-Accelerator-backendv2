import ShopifyService from "../../services/shopify.service";

import CUSTOMER_LOGIN from "./graphql";

class AuthService {

    async login(config: any) {

        return ShopifyService.execute({

            api: "storefront",

            config,

            query: CUSTOMER_LOGIN,

            variables: {

                email:

                    config.email,

                password:

                    config.password

            }

        });

    }

}

export default new AuthService();