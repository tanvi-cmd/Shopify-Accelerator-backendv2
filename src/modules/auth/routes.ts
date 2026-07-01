import { Router } from "express";

import AuthController from "./controller";

const router = Router();

router.post(
  "/login",
  AuthController.login
);

router.post(
  "/send-otp",
  AuthController.sendOtp
);

router.post(
  "/verify-otp",
  AuthController.verifyOtp
);

router.post(
  "/google",
  AuthController.google
);

router.post(
  "/logout",
  AuthController.logout
);

router.post(
  "/me",
  AuthController.me
);

export default router;