import express from "express";
import Routes from "./routes";
import path from "path";


const App = express();
App.use(express.json());
App.use(Routes);

App.use("/images", express.static(path.resolve(__dirname, "..", "productImages")))

App.listen(3333, () => {
  console.log("Server online")
});