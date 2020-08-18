import path from "path";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import Routes from "./routes";
import AppError from "./errors/AppError";

const PORT = process.env.PORT || 3333;
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

App.listen(PORT, () => {
  console.log("Server online on port:", PORT);
});
