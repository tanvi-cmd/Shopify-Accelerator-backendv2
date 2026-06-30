import { Request, Response } from "express";
import OrderService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class OrderController {
  async getOrders(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await OrderService.getOrders(context);

      return res.status(result.status).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new OrderController();