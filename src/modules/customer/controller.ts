import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../lib/response";

import CustomerService from "./service";

class CustomerController {

  async getProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const result =
        await CustomerService.getProfile(
          req.body
        );

      //return res.status(200).json(result);
      return ApiResponse.success(

        res,

        result,

        "Customer profile fetched successfully"

      );

    }

    catch (error) {

      next(error);

    }

  }

}

export default new CustomerController();