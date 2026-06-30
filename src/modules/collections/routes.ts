import { Router } from "express";

import CollectionController from "./controller";

const router = Router();

router.post(
    "/",
    CollectionController.getCollections
);

export default router;