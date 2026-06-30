import { Request, Response } from "express";
import ExplorerService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class ExplorerController {
  async connect(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await ExplorerService.connect(context);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new ExplorerController();