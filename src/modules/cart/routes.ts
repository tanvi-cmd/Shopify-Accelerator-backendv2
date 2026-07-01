import { Router } from "express";

import CartController from "./controller";

const router = Router();

/**
 * Create Cart
 */
router.post(
  "/create",
  CartController.createCart
);

/**
 * Get Cart
 */
router.post(
  "/",
  CartController.getCart
);

/**
 * Add Cart Lines
 */
router.post(
  "/add",
  CartController.addLines
);

/**
 * Update Cart Lines
 */
router.put(
  "/update",
  CartController.updateLines
);

/**
 * Remove Cart Lines
 */
router.delete(
  "/remove",
  CartController.removeLines
);

export default router;