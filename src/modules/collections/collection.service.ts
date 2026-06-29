import { DynamicStorefrontClient }
  from "../../providers/shopify/dynamic-storefront.client";

export class CollectionService {

  async getCollections(
    store: string,
    storefrontToken: string
  ) {

    const client =
      DynamicStorefrontClient.create(
        store,
        storefrontToken
      );

    return client.request(`
      query {
        collections(first: 50) {
          nodes {
            id
            title
            handle
          }
        }
      }
    `);
  }
}