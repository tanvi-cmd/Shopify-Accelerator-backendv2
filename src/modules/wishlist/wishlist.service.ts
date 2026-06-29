
export class WishlistService {
  async getWishlist(userId:string){ return []; }
  async addItem(userId:string, productId:string){ return { success:true }; }
  async removeItem(userId:string, productId:string){ return { success:true }; }
}
