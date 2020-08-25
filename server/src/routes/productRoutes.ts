import express from "express";

import multerProducts from "../config/multer";
import { cache, productSpecializedCache } from "../services/cache";

import Middleware from "../middleware/auth";
import Controller_product from "../controllers/productController";

const routes = express.Router();

const middleWare = new Middleware();
const productController = new Controller_product();

routes.post(
  "/products",
  middleWare.Auth,
  middleWare.adminAuth,
  multerProducts.single("image"),
  productController.store
);

routes.get("/products", cache("products"), productController.index);
routes.get("/product/:name", productSpecializedCache, productController.show);

export default routes;
