import { Router } from "express";

import ExplorerController from "./controller";

const router = Router();

router.post(
  "/",
  ExplorerController.connect
);

export default router;