import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../lib/response";

import CollectionService from "./service";

class CollectionController {

    async getCollections(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await CollectionService.getCollections(
                    req.body
                );

            //return res.status(200).json(result);

            return ApiResponse.success(

                res,

                result,

                "Collections fetched successfully"

            );

        }

        catch (error) {

            next(error);

        }

    }

}

export default new CollectionController();