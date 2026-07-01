import { Request, Response } from "express";

import OrderService from "./service";

import { createRuntimeContext } from "../../lib/runtime-context";

class OrderController {

  async getOrders(
    req: Request,
    res: Response
  ) {

    try {

      const context =
        createRuntimeContext(req);

      (context as any).orderQuery =
        req.body.orderQuery ||
        req.body.query;

      const result =
        await OrderService.getOrders(
          context
        );

      return res
        .status(result.status || 200)
        .json(result);

    } catch (error: any) {

      return res
        .status(500)
        .json({
          success: false,
          error: error.message
        });

    }

  }

  async getOrder(
    req: Request,
    res: Response
  ) {

    try {

      const context =
        createRuntimeContext(req);

      (context as any).orderId =
        req.params.id ||
        req.body.orderId;

      const result =
        await OrderService.getOrder(
          context
        );

      return res
        .status(result.status || 200)
        .json(result);

    } catch (error: any) {

      return res
        .status(500)
        .json({
          success: false,
          error: error.message
        });

    }

  }

}

export default new OrderController();