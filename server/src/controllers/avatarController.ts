import { Response, Request } from "express";
import knex from "../database/connection";

class AvatarController {
  async store(req: Request, res: Response) {
    const { id } = req.user;
    const avatar = req.file.filename;

    await knex("users")
      .update({
        avatar,
      })
      .where({ id });

    res.send({
      url: "http://localhost:3333/images/user/" + avatar,
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.user;

    const [user] = await knex("users").select("avatar").where({ id });

    if (!user || !user.avatar) return res.send();

    const serializedResponse = {
      url: "http://localhost:3333/images/user/" + user.avatar,
    };

    return res.send(serializedResponse);
  }
}

export default AvatarController;
