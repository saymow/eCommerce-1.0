import { Request, Response } from "express";
import knex from "../database/connection";

import postCharge from "../services/payment";
import AppError from "../errors/AppError";

class OrderController {
  async post(req: Request, res: Response) {
    const { id } = req.user;
    const {
      data: { address, shippment, cartData, token },
    } = req.body;

    const trx = await knex.transaction();

    try {
      const { name } = await trx("users").where({ id }).first();

      const amount = Math.round(
        (Number(cartData.totalCart) + Number(shippment.price)) * 100
      );

      if (!address.id) {
        await trx("address").insert({
          ...address,
          cep: shippment.cep,
          user_id: id,
        });
      }

      const charge = await postCharge({
        name,
        address,
        amount,
        shippment,
        token,
      });

      if (!charge) throw new Error("charge unsuccessful");

      await trx.commit();

      res.status(200).json({
        message: "charge posted successfully",
        charge,
      });
    } catch (err) {
      await trx.rollback();
      console.log(err);
      throw new AppError("Order error, please retry later.", 400);
    }
  }
}

export default OrderController;
