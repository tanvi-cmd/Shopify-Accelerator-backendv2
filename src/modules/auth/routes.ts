import { Router } from "express";

import AuthController from "./controller";

const router = Router();

router.post(
    "/login",
    AuthController.login
);

export default router;