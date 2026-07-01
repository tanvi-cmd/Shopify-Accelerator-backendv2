import express from "express";
import cors from "cors";

import validationMiddleware from "./middleware/validation.middleware";

import explorerRoutes from "./modules/explorer/routes";
import storeRoutes from "./modules/store/routes";
import productRoutes from "./modules/products/routes";
import collectionRoutes from "./modules/collections/routes";
import searchRoutes from "./modules/search/routes";
import menuRoutes from "./modules/menus/routes";
import cmsRoutes from "./modules/cms/routes";
import metaobjectRoutes from "./modules/metaobjects/routes";
import orderRoutes from "./modules/orders/routes";
import metafieldRoutes from "./modules/metafields/routes";
import wishlistRoutes from "./modules/wishlist/routes";
import customerRoutes from "./modules/customer/routes";


const app = express();

app.use(cors());

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({
    success: true,
    service: "HX Commerce Accelerator Backend",
    version: "2.0.0"
  });
});

app.use("/shopify", validationMiddleware);

app.use("/shopify", explorerRoutes);

app.use("/store", validationMiddleware, storeRoutes);

app.use("/products", validationMiddleware, productRoutes);

app.use("/collections", validationMiddleware, collectionRoutes);

app.use("/search", validationMiddleware, searchRoutes);

app.use("/menus", validationMiddleware, menuRoutes);

app.use("/cms", validationMiddleware, cmsRoutes);

app.use("/metaobjects",  validationMiddleware,  metaobjectRoutes);

app.use("/orders", validationMiddleware, orderRoutes);

app.use("/metafields",validationMiddleware, metafieldRoutes);

app.use("/wishlist", validationMiddleware, wishlistRoutes);

app.use("/customer", validationMiddleware,  customerRoutes);

export default app;