import { DynamicStorefrontClient }
  from "../../providers/shopify/dynamic-storefront.client";

export class SearchService {

  async search(
    store: string,
    token: string,
    query: string
  ) {

    const client =
      DynamicStorefrontClient.create(
        store,
        token
      );

    return client.request(
      `
      query($query: String!) {
        search(
          query: $query,
          first: 20,
          types: PRODUCT
        ) {
          nodes {
            ... on Product {
              id
              title
              handle
            }
          }
        }
      }
      `,
      {
        query
      }
    );

  }

}