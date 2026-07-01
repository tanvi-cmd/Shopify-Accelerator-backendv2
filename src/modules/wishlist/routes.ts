import { Router } from "express";
import WishlistController from "./controller";

const router = Router();

router.post("/", WishlistController.getWishlist);
router.post("/add", WishlistController.addWishlistItem);
router.delete("/:productId", WishlistController.removeWishlistItem);

export default router;