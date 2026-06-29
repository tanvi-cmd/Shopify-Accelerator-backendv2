import { DynamicStorefrontClient }
  from "../../providers/shopify/dynamic-storefront.client";

export class StoreService {

  async getStore(
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
        shop {
          name
          description

          primaryDomain {
            url
          }

          paymentSettings {
            currencyCode
          }

          shipsToCountries
        }
      }
    `);
  }
}