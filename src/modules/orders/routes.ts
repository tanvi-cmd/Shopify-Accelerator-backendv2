import { Router } from "express";

import OrderController from "./controller";

const router = Router();

router.post(
  "/",
  OrderController.getOrders
);

router.post(
  "/detail",
  OrderController.getOrder
);

router.post(
  "/:id",
  OrderController.getOrder
);

export default router;