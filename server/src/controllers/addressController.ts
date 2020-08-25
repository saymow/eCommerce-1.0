import { Request, Response } from "express";
import knex from "../database/connection";

class AddressController {
  async index(req: Request, res: Response) {
    const { id } = req.user;

    const response = await knex("address").select("*").where({ user_id: id });

    return res.send(response);
  }

  async store(req: Request, res: Response) {
    const { state, city, neighborhood, street, cep, number } = req.body;
    const { id: user_id } = req.user;

    await knex("address").insert({
      state,
      city,
      neighborhood,
      street,
      cep,
      number,
      user_id,
    });

    return res.send();
  }
}

export default AddressController;
