import dotenv from "dotenv";

dotenv.config();

import { GraphQLClient } from "graphql-request";

export class DynamicAdminClient {
  static create(
    store: string,
    token: string
  ) {
    return new GraphQLClient(
       `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2026-07/graphql.json`,
      {
        headers: {
          "X-Shopify-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!
        }
      }
    );
  }
}