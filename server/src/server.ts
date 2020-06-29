import express from "express";
import cors from "cors";
import path from "path";

import Routes from "./routes";

const App = express();
App.use(cors());
App.use(express.json());
App.use(Routes);

App.use("/images", express.static(path.resolve(__dirname, "..", "images")))

App.listen(3333, () => {
  console.log("Server online")
});