import { Request, Response } from "express";
import MetaobjectService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class MetaobjectController {
  async getMetaobjects(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await MetaobjectService.getMetaobjects(context);

      return res.status(result.status || 200).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new MetaobjectController();