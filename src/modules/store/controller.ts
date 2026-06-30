import { Request, Response } from "express";
import StoreService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class StoreController {
  async getStore(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await StoreService.getStore(context);

      res.status(result.status).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new StoreController();