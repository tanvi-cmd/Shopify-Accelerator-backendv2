import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../lib/response";

import ExplorerService from "./service";

class ExplorerController {

  async connect(
    req: Request,
    res: Response,
    next: NextFunction
  ) {

    try {

      const result = await ExplorerService.connect(req.body);

      //return res.status(200).json(result);
      return ApiResponse.success(

            res,

            result,

            "Explorer executed successfully"

        );

    } catch (error) {

      next(error);

    }

  }

}

export default new ExplorerController();