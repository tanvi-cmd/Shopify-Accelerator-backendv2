import { Router } from "express";
import MetaobjectController from "./controller";

const router = Router();

router.post("/", MetaobjectController.getMetaobjects);
router.post("/:type", MetaobjectController.getMetaobjects);
router.post("/:type/:handle", MetaobjectController.getMetaobjects);

export default router;