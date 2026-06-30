import { Response } from "express";

class ApiResponse {

  success(
    res: Response,
    data: any,
    message = "Success",
    status = 200
  ) {

    return res.status(status).json({

      success: true,

      message,

      data,

      meta: {

        timestamp: new Date().toISOString()

      }

    });

  }

  error(
    res: Response,
    message = "Internal Server Error",
    status = 500,
    errors?: any
  ) {

    return res.status(status).json({

      success: false,

      message,

      errors,

      meta: {

        timestamp: new Date().toISOString()

      }

    });

  }

}

export default new ApiResponse();