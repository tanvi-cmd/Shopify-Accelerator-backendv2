import { Request, Response } from "express";
import SearchService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class SearchController {
  async search(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await SearchService.search(context);

      res.status(result.status).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new SearchController();