import { Request, Response } from "express";
import knex from "../database/connection";

import postCharge from "../services/payment";
import AppError from "../errors/AppError";

class OrderController {
  async post(req: Request, res: Response) {
    const {
      data: { address, shippment, cartData, token },
      id,
    } = req.body;

    try {
      const { name } = await knex("users").where({ id }).first();

      const amount = Math.round(
        (Number(cartData.totalCart) + Number(shippment.price)) * 100
      );

      const charge = await postCharge({
        name,
        address,
        amount,
        shippment,
        token,
      });

      if (!charge) throw new Error("charge unsuccessful");

      res.status(200).json({
        message: "charge posted successfully",
        charge,
      });
    } catch (err) {
      throw new AppError("Order error, please retry later.", 400);
    }
  }
}

export default OrderController;
