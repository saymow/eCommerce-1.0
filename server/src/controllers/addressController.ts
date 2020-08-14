import { Request, Response } from "express";
import knex from "../database/connection";

class AddressController {
  async index(req: Request, res: Response) {
    const { id } = req.user;

    const response = await knex("address").select("*").where({ user_id: id });

    return res.send(response);
  }
}

export default AddressController;
