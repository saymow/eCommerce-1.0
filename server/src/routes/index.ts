import express from "express";

import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";

const Routes = express.Router();

Routes.use(userRoutes);
Routes.use(productRoutes);
Routes.use(orderRoutes);

export default Routes;
