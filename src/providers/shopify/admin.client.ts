import dotenv from "dotenv";

dotenv.config();

export const adminConfig = {
  endpoint: process.env.SHOPIFY_STORE!
};
