import { Request, Response } from "express";
import MetafieldsService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class MetafieldsController {
  async getMetafields(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result =
        await MetafieldsService.getMetafields(context);

      return res.status(result.status || 200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new MetafieldsController();