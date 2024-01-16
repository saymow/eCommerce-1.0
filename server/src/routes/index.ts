import express from "express";

import userRoutes from "./userRoutes";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";
import proxyRoutes from "./proxyRoutes";

const Routes = express.Router();

Routes.use("/api", userRoutes);
Routes.use("/api", productRoutes);
Routes.use("/api", orderRoutes);
Routes.use("/proxy", proxyRoutes);

export default Routes;