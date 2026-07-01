import { Request, Response } from "express";

import ReviewsService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

function getReviewContext(req: Request) {
  return {
    ...createRuntimeContext(req),
    ...req.body
  } as any;
}

class ReviewsController {
  async getReviews(
    req: Request,
    res: Response
  ) {
    const context =
      getReviewContext(req);

    const result =
      await ReviewsService.getReviews(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async getSummary(
    req: Request,
    res: Response
  ) {
    const context =
      getReviewContext(req);

    const result =
      await ReviewsService.getSummary(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async addReview(
    req: Request,
    res: Response
  ) {
    const context =
      getReviewContext(req);

    const result =
      await ReviewsService.addReview(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async updateReview(
    req: Request,
    res: Response
  ) {
    const context =
      getReviewContext(req);

    context.reviewId =
      req.params.id ||
      req.body.reviewId;

    const result =
      await ReviewsService.updateReview(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async deleteReview(
    req: Request,
    res: Response
  ) {
    const context =
      getReviewContext(req);

    context.reviewId =
      req.params.id ||
      req.body.reviewId;

    const result =
      await ReviewsService.deleteReview(context);

    return res
      .status(result.status || 200)
      .json(result);
  }
}

export default new ReviewsController();