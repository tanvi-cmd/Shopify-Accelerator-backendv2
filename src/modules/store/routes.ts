import { Router } from "express";

import StoreController from "./controller";

const router = Router();

router.post(
    "/",
    StoreController.getStore
);

export default router;