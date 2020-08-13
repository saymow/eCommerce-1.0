import path from "path";
import dotenv from "dotenv";
import express, { Response } from "express";
import cors from "cors";

dotenv.config();

import Routes from "./routes";
import AppError from "./errors/AppError";

const App = express();
App.use(cors());
App.use(express.json());
App.use(Routes);

App.use("/images", express.static(path.resolve(__dirname, "..", "images")));

App.use((error: Error, _, res: Response, _) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
    });
  }

  console.log(error);

  res.status(500).send({
    message: "Internal server error.",
  });
});

App.listen(3333, () => {
  console.log("Server online");
});
