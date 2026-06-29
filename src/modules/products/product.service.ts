import { DynamicStorefrontClient }
  from "../../providers/shopify/dynamic-storefront.client";

export class ProductService {

  async getProducts(
    store: string,
    storefrontToken: string
  ) {

    console.log("Store =", store);
    console.log("Token Exists =", !!storefrontToken);

    const client =
      DynamicStorefrontClient.create(
        store,
        storefrontToken
      );

    return client.request(`
      query {
        products(first: 20) {
          nodes {
            id
            title
            handle
            description
          }
        }
      }
    `);
  }

  async getByHandle(
    store: string,
    storefrontToken: string,
    handle: string
  ) {

    const client =
      DynamicStorefrontClient.create(
        store,
        storefrontToken
      );

    return client.request(
      `
      query($handle: String!) {
        product(handle: $handle) {
          id
          title
          description
        }
      }
      `,
      { handle }
    );
  }
}