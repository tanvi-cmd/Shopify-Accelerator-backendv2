import { Router } from "express";
import ProductController from "./controller";

const router = Router();

router.post("/", ProductController.getProducts);

export default router;