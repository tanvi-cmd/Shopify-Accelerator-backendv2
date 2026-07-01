import ShopifyService from "../../services/shopify.service";

import {
  CREATE_CART,
  GET_CART,
  ADD_CART_LINES,
  UPDATE_CART_LINES,
  REMOVE_CART_LINES
} from "./graphql";

class CartService {

  async createCart(context: any) {

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: CREATE_CART

    });

  }

  async getCart(context: any) {

    if (!context.cartId) {

      return {

        success: false,

        status: 400,

        message: "cartId is required."

      };

    }

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: GET_CART,

      variables: {

        cartId: context.cartId

      }

    });

  }

  async addLines(context: any) {

    if (!context.cartId) {

      return {

        success: false,

        status: 400,

        message: "cartId is required."

      };

    }

    if (!context.lines) {

      return {

        success: false,

        status: 400,

        message: "lines are required."

      };

    }

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: ADD_CART_LINES,

      variables: {

        cartId: context.cartId,

        lines: context.lines

      }

    });

  }

  async updateLines(context: any) {

    if (!context.cartId) {

      return {

        success: false,

        status: 400,

        message: "cartId is required."

      };

    }

    if (!context.lines) {

      return {

        success: false,

        status: 400,

        message: "lines are required."

      };

    }

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: UPDATE_CART_LINES,

      variables: {

        cartId: context.cartId,

        lines: context.lines

      }

    });

  }

  async removeLines(context: any) {

    if (!context.cartId) {

      return {

        success: false,

        status: 400,

        message: "cartId is required."

      };

    }

    if (!context.lineIds) {

      return {

        success: false,

        status: 400,

        message: "lineIds are required."

      };

    }

    return ShopifyService.execute({

      api: "storefront",

      context,

      query: REMOVE_CART_LINES,

      variables: {

        cartId: context.cartId,

        lineIds: context.lineIds

      }

    });

  }

}

export default new CartService();