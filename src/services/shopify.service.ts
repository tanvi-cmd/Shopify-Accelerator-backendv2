import axios, { AxiosRequestConfig } from "axios";
import { RuntimeContext } from "../shared/interfaces/runtime-context";

export interface ShopifyExecuteOptions {
  api: "storefront" | "admin";
  context: RuntimeContext;
  query: string;
  variables?: Record<string, any>;
}

export interface ShopifyResult<T> {
  success: boolean;
  data?: T;
  errors?: any;
  status: number;
  duration: number;
}

class ShopifyService {

  async execute<T>(
    options: ShopifyExecuteOptions
  ): Promise<ShopifyResult<T>> {

    const started = Date.now();

    const {
      api,
      context,
      query,
      variables = {}
    } = options;

    const endpoint =
      api === "storefront"
        ? `https://${context.store}/api/${context.apiVersion}/graphql.json`
        : `https://${context.store}/admin/api/${context.apiVersion}/graphql.json`;

    const config: AxiosRequestConfig = {

      timeout: 30000,

      headers: {

        "Content-Type": "application/json",

        ...(api === "storefront"
          ? {
              "X-Shopify-Storefront-Access-Token":
                context.storefrontToken
            }
          : {
              "X-Shopify-Access-Token":
                context.adminToken
            })

      }

    };

    try {

      const response = await axios.post(
        endpoint,
        {
          query,
          variables
        },
        config
      );

      return {

        success: true,

        status: response.status,

        duration: Date.now() - started,

        data: response.data.data as T,

        errors: response.data.errors

      };

    } catch (error: any) {

      return {

        success: false,

        status: error.response?.status || 500,

        duration: Date.now() - started,

        errors:
          error.response?.data ??
          error.message

      };

    }

  }

}

export default new ShopifyService();