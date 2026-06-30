import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../lib/response";

import AuthService from "./service";

class AuthController {

    async login(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await AuthService.login(
                    req.body
                );

            //return res.status(200).json(result);
            return ApiResponse.success(
            
                        res,
            
                        result,
            
                        "Authentication executed successfully"
            
              );

        }

        catch (error) {

            next(error);

        }

    }

}

export default new AuthController();