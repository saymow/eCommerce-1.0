import { Request, Response, json } from "express";
import bcrypt, { genSaltSync } from "bcrypt";
import knex from "../database/connection";
import connection from "../database/connection";
import jwt from "jsonwebtoken";
const authConfig = require("../config/auth.json");

interface userData {
  id: Number;
  email: string;
  password: string;
  cpf: string;
  cep: string;
  adminPermission: number;
}

class UserController {
  async register(req: Request, res: Response) {
    const { email, password, cpf, cep } = req.body;

    const userAlreadyExists = await knex("users").where("email", email);

    if (userAlreadyExists.length !== 0)
      return res.json({ error: { email: "Email already in usage." } });

    try {
      bcrypt.hash(password, genSaltSync(), async (err, hash) => {
        const { insertedId } = await connection("users").insert({
          email,
          password: hash,
          cpf,
          cep,
        });

        // Confirmation email to be done.
        return res.json({
          token: generateToken({ insertedId }, authConfig.secret),
          userData: {
            email,
            cep,
            cpf,
            adminPermission: false,
          },
        });
      });
    } catch (err) {}
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await connection<userData>("users").where(
      "email",
      email
    );

    if (userExists.length === 0)
      return res.json({ error: { email: "Email not registered." } });

    const {
      id,
      cep,
      cpf,
      password: passwordHashed,
      adminPermission,
    } = userExists[0];

    if (!(await bcrypt.compare(password, passwordHashed)))
      return res.json({ error: { password: "Incorrect password." } });

    return res.json({
      token: generateToken({ id }, authConfig.secret),
      userData: {
        email,
        cep,
        cpf,
        adminPermission: adminPermission === 1 ? true : false,
      },
    });
  }
}

function generateToken(params = {}, secret: string) {
  return jwt.sign(params, secret, {
    expiresIn: 8640,
  });
}

export default UserController;
