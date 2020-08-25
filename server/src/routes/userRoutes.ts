import express from "express";

import multerUser from "../config/userMulter";

import Middleware from "../middleware/auth";
import Controller_user from "../controllers/userController";
import Controller_avatar from "../controllers/avatarController";
import Controller_address from "../controllers/addressController";
import Controller_order from "../controllers/orderController";

const routes = express.Router();

const middleWare = new Middleware();
const userController = new Controller_user();
const avatarController = new Controller_avatar();
const addressController = new Controller_address();
const orderController = new Controller_order();

routes.post("/login", userController.login);

routes.post("/register", userController.register);

routes.get("/account", middleWare.Auth, userController.validifyToken);

routes.get("/users/addresses", middleWare.Auth, addressController.index);

routes.get("/users/me", middleWare.Auth, userController.index);

routes.put("/users/me", middleWare.Auth, userController.update);

routes.get("/users/purchases", middleWare.Auth, orderController.list);

routes.put(
  "/users/change_password",
  middleWare.Auth,
  userController.changePassword
);

routes.get("/users/avatar", middleWare.Auth, avatarController.show);

routes.post(
  "/users/avatar",
  middleWare.Auth,
  multerUser.single("image"),
  avatarController.store
);

export default routes;
