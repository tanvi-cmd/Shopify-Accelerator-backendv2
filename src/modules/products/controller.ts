import {
  Request,
  Response,
  NextFunction
} from "express";

import ProductService from "./service";

import ApiResponse from "../../lib/response";

import {
  ProductRequest
} from "./types";

class ProductController {

  async getProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const config =
        req.body as ProductRequest;

      const result =
        await ProductService.getProducts(
          config
        );

      return ApiResponse.success(

        res,

        result,

        "Products fetched successfully"

      );

    }

    catch (error) {

      next(error);

    }

  }

}

export default new ProductController();