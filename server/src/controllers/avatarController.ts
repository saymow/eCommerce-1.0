import { Response, Request } from "express";
import knex from "../database/connection";

import { urlFormatter } from "../utils/formaters";

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
      url: urlFormatter(`images/user/${avatar}`),
    });
  }

  async show(req: Request, res: Response) {
    const { id } = req.user;

    const [user] = await knex("users").select("avatar").where({ id });

    if (!user || !user.avatar) return res.send();

    const serializedResponse = {
      url: urlFormatter(`images/user/${user.avatar}`),
    };

    return res.send(serializedResponse);
  }
}

export default AvatarController;
