import express from "express";

import { consultarCep, calcularPrecoPrazo } from "correios-brasil";
import AppError from "../errors/AppError";

const routes = express.Router();

routes.get("/checkPostalCode/:postalCode", async (req, res) => {
  const { postalCode } = req.params;

  const response = await consultarCep(postalCode);

  if (response instanceof Error) {
    throw new AppError("Third party api error", 500);
  }

  res.send(response);
});

routes.post("/calcultePrice", async (req, res) => {
  const { body } = req;

  const response = await calcularPrecoPrazo(body);

  if (response instanceof Error) {
    throw new AppError("Third party api error", 500);
  }

  res.send(response);
});

export default routes;
