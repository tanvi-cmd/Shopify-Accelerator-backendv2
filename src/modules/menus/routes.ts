import { Router } from "express";
import MenuController from "./controller";

const router = Router();

router.post("/main", MenuController.main);
router.post("/footer", MenuController.footer);

export default router;