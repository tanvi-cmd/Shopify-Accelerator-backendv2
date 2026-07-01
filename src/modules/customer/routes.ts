import { Router } from "express";

import CustomerController from "./controller";

const router = Router();

router.post(
  "/profile",
  CustomerController.getProfile
);

router.post(
  "/orders",
  CustomerController.getOrders
);

router.post(
  "/addresses",
  CustomerController.getAddresses
);

router.post(
  "/address",
  CustomerController.createAddress
);

router.put(
  "/address",
  CustomerController.updateAddress
);

router.delete(
  "/address/:id",
  CustomerController.deleteAddress
);

export default router;