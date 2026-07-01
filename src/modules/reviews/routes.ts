import { Router } from "express";

import ReviewsController from "./controller";

const router = Router();

router.post(
  "/",
  ReviewsController.getReviews
);

router.post(
  "/summary",
  ReviewsController.getSummary
);

router.post(
  "/add",
  ReviewsController.addReview
);

router.put(
  "/:id",
  ReviewsController.updateReview
);

router.delete(
  "/:id",
  ReviewsController.deleteReview
);

export default router;