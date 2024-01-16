import path from "path";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import "express-async-errors";

import Routes from "./routes";
import AppError from "./errors/AppError";

const PORT = process.env.PORT || 3333;
const App = express();
App.use(
  cors(
    process.env.ENVIRONMENT === "dev"
      ? undefined
      : {
          origin: "https://e-commerce1.netlify.app",
        }
  )
);
App.use(express.json());
App.use(Routes);

App.use(
  "/images",
  express.static(path.resolve(__dirname, "..", "images"), { maxAge: 15552000 })
);

App.use((error: Error, _: Request, res: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    console.error(error);

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
