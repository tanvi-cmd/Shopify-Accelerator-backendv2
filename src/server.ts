import dotenv from "dotenv";

dotenv.config();

import app from "./app";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {

  console.log("");

  console.log("======================================");

  console.log("HX Shopify Headless Backend");

  console.log("======================================");

  console.log(`Environment : ${process.env.NODE_ENV || "development"}`);

  console.log(`Port        : ${PORT}`);

  console.log(`Health      : http://localhost:${PORT}/health`);

  console.log("");

});