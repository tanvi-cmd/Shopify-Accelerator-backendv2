import express, {
  Application,
  Request,
  Response
} from "express";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import explorerRoutes from "./modules/explorer/routes";
import storeRoutes from "./modules/store/routes";
import productRoutes from "./modules/products/routes";
import collectionRoutes from "./modules/collections/routes";
import searchRoutes from "./modules/search/routes";
import customerRoutes from "./modules/customer/routes";
import authRoutes from "./modules/auth/routes";

import errorHandler from "./middleware/errorHandler";

const app: Application = express();

/*
|--------------------------------------------------------------------------
| Security Middleware
|--------------------------------------------------------------------------
*/

app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(
  express.json({
    limit: "10mb"
  })
);

app.use(
  express.urlencoded({
    extended: true
  })
);

/*
|--------------------------------------------------------------------------
| Logger
|--------------------------------------------------------------------------
*/

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get(
  "/health",
  (
    req: Request,
    res: Response
  ) => {

    res.status(200).json({

      success: true,

      service: "HX Shopify Headless Backend",

      version: "2.0.0",

      environment:
        process.env.NODE_ENV,

      timestamp:
        new Date().toISOString()

    });

  }
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(
  "/shopify/connect",
  explorerRoutes
);

app.use(
  "/store",
  storeRoutes
);

app.use(
  "/products",
  productRoutes
);

app.use(
  "/collections",
  collectionRoutes
);

app.use(
  "/search",
  searchRoutes
);

app.use(
  "/customer",
  customerRoutes
);

app.use(
    "/auth",
    authRoutes
);

/*
|--------------------------------------------------------------------------
| 404
|--------------------------------------------------------------------------
*/

app.use(
  (
    req: Request,
    res: Response
  ) => {

    res.status(404).json({

      success: false,

      message: "Route not found",

      path: req.originalUrl

    });

  }
);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

export default app;