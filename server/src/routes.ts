import express from "express";

import Middleware from "./middleware/auth";
import controller_user from "./controllers/userController";
import controller_product from "./controllers/productController";

import multer from "multer";
import multerConfig from "./config/multer";

const middleWare = new Middleware();

const userController = new controller_user();
const productController = new controller_product();

const upload = multer(multerConfig);

const Routes = express();

Routes.post("/register", userController.register);
Routes.post("/login", userController.login);

Routes.post(
  "/products",
  middleWare.Auth,
  middleWare.adminAuth,
  upload.single("image"),
  productController.create
);
Routes.get("/", productController.list);
Routes.get("/product/:product_id", productController.detailed)


export default Routes;
