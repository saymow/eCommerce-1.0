import express from "express";
import knex from "./database/connection";

import multerProducts from "./config/multer";
import multerUser from "./config/userMulter";

import { cache, productSpecializedCache } from "./services/cache";
import Middleware from "./middleware/auth";
import OrderModel from "./models/order_model";
import ValidateOrder from "./middleware/validate_order";

import controller_user from "./controllers/userController";
import controller_avatar from "./controllers/avatarController";
import controller_product from "./controllers/productController";
import controller_order from "./controllers/orderController";
import controller_address from "./controllers/addressController";

const middleWare = new Middleware();

const userController = new controller_user();
const avatarController = new controller_avatar();
const productController = new controller_product();
const orderController = new controller_order();
const addressController = new controller_address();

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
Routes.get("/users/avatar", middleWare.Auth, avatarController.show);
Routes.post(
  "/users/avatar",
  middleWare.Auth,
  multerUser.single("image"),
  avatarController.store
);

Routes.post(
  "/products",
  middleWare.Auth,
  middleWare.adminAuth,
  multerProducts.single("image"),
  productController.create
);

Routes.get("/products", cache("products"), productController.list);
Routes.get(
  "/product/:name",
  productSpecializedCache,
  productController.detailed
);

Routes.post(
  "/checkout",
  middleWare.Auth,
  OrderModel,
  ValidateOrder,
  orderController.post
);

export default Routes;
