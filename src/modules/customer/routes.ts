import { Router } from "express";

import CustomerController from "./controller";

const router = Router();

router.post(
  "/profile",
  CustomerController.getProfile
);

export default router;