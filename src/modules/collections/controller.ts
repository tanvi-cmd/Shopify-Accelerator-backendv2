import { Request, Response } from "express";
import CollectionService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class CollectionController {
  async getCollections(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await CollectionService.getCollections(context);

      res.status(result.status).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new CollectionController();