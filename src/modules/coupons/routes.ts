import { Router } from "express";

import CouponsController from "./controller";

const router = Router();

router.post(
  "/",
  CouponsController.listCoupons
);

router.post(
  "/detail",
  CouponsController.getCoupon
);

router.post(
  "/create",
  CouponsController.createCoupon
);

router.post(
  "/validate",
  CouponsController.validateCoupon
);

router.post(
  "/apply-to-cart",
  CouponsController.applyToCart
);

router.put(
  "/:id",
  CouponsController.updateCoupon
);

router.delete(
  "/:id",
  CouponsController.deleteCoupon
);

export default router;