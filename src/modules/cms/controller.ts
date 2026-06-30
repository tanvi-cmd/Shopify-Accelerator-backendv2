import { Request, Response } from "express";
import CmsService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class CmsController {
  async getPage(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);
      const handle = String(req.params.handle);

      const result = await CmsService.getPage(
        context,
        handle
      );

      return res.status(result.status).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getPages(
        req: Request,
        res: Response
    ) {

        const context =
            createRuntimeContext(req);

        const result =
            await CmsService.getPages(
                context
            );

        res.status(result.status).json(result);

    }

  async getBlogs(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await CmsService.getBlogs(context);

      return res.status(result.status).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getBlog(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);
      const handle = String(req.params.handle);

      const result = await CmsService.getBlog(
        context,
        handle
      );

      return res.status(result.status).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  async getBlogArticles(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);
      const handle = String(req.params.handle);

      const result = await CmsService.getBlogArticles(
        context,
        handle
      );

      return res.status(result.status).json(result);
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default new CmsController();