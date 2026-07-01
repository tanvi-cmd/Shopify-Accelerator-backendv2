import { Request, Response } from "express";
import WishlistService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class WishlistController {
  async getWishlist(req: Request, res: Response) {
    const context = createRuntimeContext(req);
    const result = await WishlistService.getWishlist(context);
    return res.status(result.status).json(result);
  }

  async addWishlistItem(req: Request, res: Response) {
    const context = createRuntimeContext(req);
    const result =
      await WishlistService.addWishlistItem(context);
    return res.status(result.status).json(result);
  }

  async removeWishlistItem(req: Request, res: Response) {
    const context = createRuntimeContext(req);

    context.productId =
      req.params.productId ||
      req.body.productId;

    const result =
      await WishlistService.removeWishlistItem(context);

    return res.status(result.status).json(result);
  }
}

export default new WishlistController();