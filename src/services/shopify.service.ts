import axios from "axios";

export interface ShopifyConfig {
  store: string;
  storefrontToken: string;
  adminToken: string;
  apiVersion: string;
}

export interface ShopifyRequest {
  api: "storefront" | "admin";
  config: ShopifyConfig;
  query: string;
  variables?: Record<string, any>;
}

class ShopifyService {

  private async request<T>(
    url: string,
    tokenHeader: string,
    token: string,
    query: string,
    variables: Record<string, any> = {}
  ) {

    const started = Date.now();

    try {

      const response = await axios.post(
        url,
        {
          query,
          variables
        },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
            [tokenHeader]: token
          }
        }
      );

      if (response.data.errors) {

        return {
          success: false,
          duration: Date.now() - started,
          error: response.data.errors
        };

      }

      return {

        success: true,

        duration: Date.now() - started,

        data: response.data.data as T

      };

    }
    catch (error: any) {

      return {

        success: false,

        duration: Date.now() - started,

        error:
          error.response?.data ??
          error.message ??
          "Unknown Error"

      };

    }

  }

  async execute<T>(
    request: ShopifyRequest
  ) {

    const { config, api, query, variables } = request;

    const endpoint =
      api === "storefront"
        ? `https://${config.store}/api/${config.apiVersion}/graphql.json`
        : `https://${config.store}/admin/api/${config.apiVersion}/graphql.json`;

    const header =
      api === "storefront"
        ? "X-Shopify-Storefront-Access-Token"
        : "X-Shopify-Access-Token";

    const token =
      api === "storefront"
        ? config.storefrontToken
        : config.adminToken;

    return this.request<T>(
      endpoint,
      header,
      token,
      query,
      variables
    );

  }

}

export default new ShopifyService();