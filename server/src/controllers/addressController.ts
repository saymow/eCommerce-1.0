import { Request, Response } from "express";
import knex from "../database/connection";

class AddressController {
  async index(req: Request, res: Response) {
    const { id } = req.user;

    const response = await knex("addresses").select("*").where({ user_id: id });

    return res.send(response);
  }

  async store(req: Request, res: Response) {
    const { state, city, neighborhood, street, postalCode, number } = req.body;
    const { id: user_id } = req.user;

    await knex("addresses").insert({
      state,
      city,
      neighborhood,
      street,
      postalCode,
      number,
      user_id,
    });

    return res.sendStatus(201);
  }

  async update(req: Request, res: Response) {
    const {
      id,
      state,
      city,
      neighborhood,
      street,
      postalCode,
      number,
    } = req.body;
    const { id: user_id } = req.user;

    await knex("addresses")
      .update({
        state,
        city,
        neighborhood,
        street,
        postalCode,
        number,
      })
      .where({
        id,
        user_id,
      });

    res.send();
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.body;
    const { id: user_id } = req.user;

    await knex("addresses").delete().where({ id, user_id });

    res.send();
  }
}

export default AddressController;
