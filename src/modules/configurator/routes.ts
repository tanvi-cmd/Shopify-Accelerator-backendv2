import { Router } from "express";

import ConfiguratorController from "./controller";

const router = Router();

router.post(
  "/validate",
  ConfiguratorController.validate
);

router.post(
  "/price",
  ConfiguratorController.price
);

router.post(
  "/sku",
  ConfiguratorController.sku
);

router.post(
  "/cart-lines",
  ConfiguratorController.cartLines
);

router.post(
  "/add-to-cart",
  ConfiguratorController.addToCart
);

router.post(
  "/quote",
  ConfiguratorController.quote
);

router.post(
  "/session",
  ConfiguratorController.session
);

export default router;