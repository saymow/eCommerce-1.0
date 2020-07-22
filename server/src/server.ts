import path from "path";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

import Routes from "./routes";

const App = express();
App.use(cors());
App.use(express.json());
App.use(Routes);

App.use("/images", express.static(path.resolve(__dirname, "..", "images")));

App.listen(3333, () => {
  console.log("Server online");
});
