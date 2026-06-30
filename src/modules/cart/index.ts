import CartService from "./service";

export default {
  name: "Cart",

  async execute(context: any) {
    return CartService.createCart(context);
  }
};