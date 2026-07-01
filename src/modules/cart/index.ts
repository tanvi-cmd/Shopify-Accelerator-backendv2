import CartService from "./service";

export default {

  name: "Cart",

  async execute(context: any) {

    /**
     * Explorer:
     * If no cartId is supplied, create a temporary cart.
     */

    if (!context.cartId) {

      return CartService.createCart(
        context
      );

    }

    return CartService.getCart(
      context
    );

  }

};