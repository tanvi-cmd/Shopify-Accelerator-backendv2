import { GraphQLClient } from "graphql-request";

export class DynamicStorefrontClient {

  static create(
    store: string,
    token: string
  ) {

    return new GraphQLClient(
      `https://${store}/api/2026-07/graphql.json`,
      {
        headers: {
          "X-Shopify-Storefront-Access-Token":
            token
        }
      }
    );
  }

}