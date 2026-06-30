import { Router } from "express";
import SearchController from "./controller";

const router = Router();

router.post("/", SearchController.search);

export default router;