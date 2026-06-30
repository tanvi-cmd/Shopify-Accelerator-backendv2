import { Request, Response } from "express";
import MenuService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class MenuController {
  async main(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);
      const result = await MenuService.getMainMenu(context);
      return res.status(result.status).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async footer(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);
      const result = await MenuService.getFooterMenu(context);
      return res.status(result.status).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new MenuController();