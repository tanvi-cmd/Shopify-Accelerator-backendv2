import { Router } from "express";
import ExplorerController from "./controller";

const router = Router();

router.post("/connect", ExplorerController.connect);

export default router;