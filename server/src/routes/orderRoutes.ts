import express from "express";

import Middleware from "../middleware/auth";
import OrderModel from "../models/order_model";
import ValidateOrder from "../middleware/validate_order";

import Controller_order from "../controllers/orderController";

const routes = express.Router();

const middleWare = new Middleware();
const orderController = new Controller_order();

routes.post(
  "/order",
  middleWare.Auth,
  OrderModel,
  ValidateOrder,
  orderController.post
);

export default routes;
