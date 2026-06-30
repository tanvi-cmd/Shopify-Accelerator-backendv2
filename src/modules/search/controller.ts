import { Request, Response, NextFunction } from "express";
import ApiResponse from "../../lib/response";

import SearchService from "./service";

class SearchController {

    async search(
        req: Request,
        res: Response,
        next: NextFunction
    ) {

        try {

            const result =
                await SearchService.search(
                    req.body
                );

            //return res.status(200).json(result);
            return ApiResponse.success(

                    res,

                    result,

                    "Search completed successfully"

                );
        }

        catch (error) {

            next(error);

        }

    }

}

export default new SearchController();