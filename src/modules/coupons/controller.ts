import { Request, Response } from "express";

import CouponsService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

function getCouponContext(req: Request) {
  return {
    ...createRuntimeContext(req),
    ...req.body,
    discountId:
      req.params.id ||
      req.body.discountId ||
      req.body.couponId ||
      req.body.id
  } as any;
}

class CouponsController {
  async listCoupons(
    req: Request,
    res: Response
  ) {
    const context =
      getCouponContext(req);

    const result =
      await CouponsService.listCoupons(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async getCoupon(
    req: Request,
    res: Response
  ) {
    const context =
      getCouponContext(req);

    const result =
      await CouponsService.getCoupon(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async createCoupon(
    req: Request,
    res: Response
  ) {
    const context =
      getCouponContext(req);

    const result =
      await CouponsService.createCoupon(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async validateCoupon(
    req: Request,
    res: Response
  ) {
    const context =
      getCouponContext(req);

    const result =
      await CouponsService.validateCoupon(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async applyToCart(
    req: Request,
    res: Response
  ) {
    const context =
      getCouponContext(req);

    const result =
      await CouponsService.applyToCart(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async updateCoupon(
    req: Request,
    res: Response
  ) {
    const context =
      getCouponContext(req);

    const result =
      await CouponsService.updateCoupon(context);

    return res
      .status(result.status || 200)
      .json(result);
  }

  async deleteCoupon(
    req: Request,
    res: Response
  ) {
    const context =
      getCouponContext(req);

    const result =
      await CouponsService.deleteCoupon(context);

    return res
      .status(result.status || 200)
      .json(result);
  }
}

export default new CouponsController();