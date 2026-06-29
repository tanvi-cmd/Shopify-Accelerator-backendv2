import dotenv from "dotenv";

dotenv.config();

import { GraphQLClient } from "graphql-request";

export const storefrontClient = new GraphQLClient(
 `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2026-07/graphql.json`,
  {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_TOKEN!
    }
  }
);