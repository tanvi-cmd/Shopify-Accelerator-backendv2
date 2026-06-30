import ShopifyService from "../../services/shopify.service";

class StoreService {
  async getStore(config: any) {
    return ShopifyService.execute({
      api: "storefront",
      config,
      query: `
        query GetStore {

          shop {

            id

            name

            description

            primaryDomain {

              url

            }

            paymentSettings {

              currencyCode

              countryCode

            }

          }

        }
      `
    });
  }
}

export default new StoreService();