import { Request, Response } from "express";
import ProductService from "./service";
import { createRuntimeContext } from "../../lib/runtime-context";

class ProductController {
  async getProducts(req: Request, res: Response) {
    try {
      const context = createRuntimeContext(req);

      const result = await ProductService.getProducts(context);

      res.status(result.status).json(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default new ProductController();