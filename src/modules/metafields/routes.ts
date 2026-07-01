import { Router } from "express";
import MetafieldsController from "./controller";

const router = Router();

router.post("/", MetafieldsController.getMetafields);

export default router;