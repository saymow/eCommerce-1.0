import path from "path";
import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

dotenv.config();

import Routes from "./routes";
import AppError from "./errors/AppError";

const App = express();
App.use(cors());
App.use(express.json());
App.use(Routes);

App.use("/images", express.static(path.resolve(__dirname, "..", "images")));

App.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
    });
  }

  console.error(error);

  res.status(500).send({
    message: "Internal server error.",
  });
});

App.listen(3333, () => {
  console.log("Server online");
});
