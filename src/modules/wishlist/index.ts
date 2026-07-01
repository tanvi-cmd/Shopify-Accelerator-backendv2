import WishlistService from "./service";

export default {
  name: "Wishlist",

  async execute(context: any) {
    return WishlistService.getAllWishlists(context);
  }
};