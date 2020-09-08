import express from "express";

import { consultarCep, calcularPrecoPrazo } from "correios-brasil";

const routes = express.Router();

routes.get("/checkPostalCode/:postalCode", (req, res) => {
  const { postalCode } = req.params;

  consultarCep(postalCode)
    .then((response: any) => {
      res.send(response);
    })
    .catch((error: Error) => {
      res.send({
        MsgErro: "Unable to find postal code.",
      });
    });
});

routes.post("/calcultePrice", (req, res) => {
  const { body } = req;

  calcularPrecoPrazo(body)
    .then((response: any) => {
      res.send(response);
    })
    .catch((error: any) => {
      res.send({
        MsgErro: "Failed to fetch data.",
      });
    });
});

export default routes;
