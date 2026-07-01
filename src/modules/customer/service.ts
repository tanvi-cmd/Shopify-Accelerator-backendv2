import ShopifyService from "../../services/shopify.service";

import {
  CUSTOMER_PROFILE_QUERY,
  CUSTOMER_ORDERS_QUERY,
  CUSTOMER_ADDRESSES_QUERY,
  CUSTOMER_ADDRESS_CREATE_MUTATION,
  CUSTOMER_ADDRESS_UPDATE_MUTATION,
  CUSTOMER_ADDRESS_DELETE_MUTATION
} from "./graphql";

class CustomerService {

  async getProfile(context: any) {

    if (!context.customerAccessToken) {

      return {
        success: false,
        status: 200,
        message: "Customer Access Token not provided.",
        data: null
      };

    }

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: CUSTOMER_PROFILE_QUERY,

      variables: {
        customerAccessToken: context.customerAccessToken
      }

    });

  }

  async getOrders(context: any) {

    if (!context.customerAccessToken) {

      return {
        success: false,
        status: 200,
        message: "Customer Access Token not provided.",
        data: []
      };

    }

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: CUSTOMER_ORDERS_QUERY,

      variables: {

        customerAccessToken: context.customerAccessToken,

        first: context.pageSize || 10

      }

    });

  }

  async getAddresses(context: any) {

    if (!context.customerAccessToken) {

      return {
        success: false,
        status: 200,
        message: "Customer Access Token not provided.",
        data: []
      };

    }

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: CUSTOMER_ADDRESSES_QUERY,

      variables: {

        customerAccessToken: context.customerAccessToken,

        first: 20

      }

    });

  }

  async createAddress(
  context: any
) {

  if (!context.customerAccessToken) {

    return {

      success: false,

      status: 200,

      message:
        "Customer Access Token not provided."

    };

  }

  return ShopifyService.execute({

    api: "storefront",

    context,

    query:
      CUSTOMER_ADDRESS_CREATE_MUTATION,

    variables: {

      customerAccessToken:
        context.customerAccessToken,

      address: context.address

    }

  });

}

async updateAddress(
  context: any
) {

  if (!context.customerAccessToken) {

    return {

      success: false,

      status: 200,

      message:
        "Customer Access Token not provided."

    };

  }

  return ShopifyService.execute({

    api: "storefront",

    context,

    query:
      CUSTOMER_ADDRESS_UPDATE_MUTATION,

    variables: {

      customerAccessToken:
        context.customerAccessToken,

      id: context.addressId,

      address: context.address

    }

  });

}

async deleteAddress(
  context: any
) {

  if (!context.customerAccessToken) {

    return {

      success: false,

      status: 200,

      message:
        "Customer Access Token not provided."

    };

  }

  return ShopifyService.execute({

    api: "storefront",

    context,

    query:
      CUSTOMER_ADDRESS_DELETE_MUTATION,

    variables: {

      customerAccessToken:
        context.customerAccessToken,

      id: context.addressId

    }

  });

}

}

export default new CustomerService();