import { Router } from "express";
import OrderController from "./controller";

const router = Router();

router.post("/", OrderController.getOrders);

export default router;