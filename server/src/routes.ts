import express from "express";
import knex from "./database/connection";

import Middleware from "./middleware/auth";
import OrderModel from "./models/order_model";
import ValidateOrder from "./middleware/validate_order";

import controller_user from "./controllers/userController";
import controller_product from "./controllers/productController";
import controller_order from "./controllers/orderController";
import controller_address from "./controllers/addressController";

import multer from "multer";
import multerConfig from "./config/multer";

const middleWare = new Middleware();

const userController = new controller_user();
const productController = new controller_product();
const orderController = new controller_order();
const addressController = new controller_address();

const upload = multer(multerConfig);

const Routes = express();

Routes.get("/account", middleWare.Auth, async (req, res) => {
  const { id } = req.user;

  const data = await knex("users").where({ id }).first();

  const { email, name } = data;

  return res.send({
    email,
    name,
  });
});

Routes.post("/register", userController.register);
Routes.post("/login", userController.login);
Routes.get("/users/addresses", middleWare.Auth, addressController.index);
Routes.get("/users/me", middleWare.Auth, userController.index);
Routes.get("/users/purchases", middleWare.Auth, orderController.list);
Routes.put(
  "/users/change_password",
  middleWare.Auth,
  userController.changePassword
);

Routes.post(
  "/products",
  middleWare.Auth,
  middleWare.adminAuth,
  upload.single("image"),
  productController.create
);

Routes.get("/", productController.list);
Routes.get("/product/:name", productController.detailed);

Routes.post(
  "/checkout",
  middleWare.Auth,
  OrderModel,
  ValidateOrder,
  orderController.post
);

export default Routes;
