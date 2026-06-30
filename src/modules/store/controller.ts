import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../lib/response";


import StoreService from "./service";

class StoreController {

    async getStore(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await StoreService.getStore(
                    req.body
                );

            //return res.status(200).json(result);
            return ApiResponse.success(

                res,

                result,

                "Store fetched successfully"

            );

        }

        catch (error) {

            next(error);

        }

    }

}

export default new StoreController();