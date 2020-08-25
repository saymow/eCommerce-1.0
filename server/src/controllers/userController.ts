import { Request, Response } from "express";
import bcrypt from "bcrypt";
import knex from "../database/connection";
import connection from "../database/connection";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

interface userData {
  id: Number;
  name: string;
  email: string;
  password: string;
  cpf: string;
  cep: string;
  adminPermission: number;
}

class UserController {
  async register(req: Request, res: Response) {
    const { name, email, password, cpf, birthDate } = req.body;

    const userAlreadyExists = await knex("users").where("email", email);

    if (userAlreadyExists.length !== 0)
      return res.status(409).send({
        email: "Email already in use.",
      });

    try {
      bcrypt.hash(password, 8, async (err, hash) => {
        const [id] = await connection("users").insert({
          name,
          email,
          password: hash,
          cpf,
          birth_date: birthDate,
          sex: 0,
        });

        // Confirmation email to be done.
        return res.json({
          token: generateToken(
            { id },
            process.env.JWT_SESSION_TOKEN_SECRET as string
          ),
          userData: {
            name,
            email,
            adminPermission: false,
          },
        });
      });
    } catch (err) {
      throw new AppError("Internal server error.", 500);
    }
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const userExists = await connection<userData>("users").where(
      "email",
      email
    );

    if (userExists.length === 0)
      return res.status(409).send({
        email: "Email not registered.",
      });

    const {
      id,
      name,
      password: passwordHashed,
      adminPermission,
    } = userExists[0];

    if (!(await bcrypt.compare(password, passwordHashed)))
      return res.status(409).send({
        password: "Incorrect password.",
      });

    return res.json({
      token: generateToken(
        { id },
        process.env.JWT_SESSION_TOKEN_SECRET as string
      ),
      userData: {
        name,
        email,
        adminPermission: adminPermission === 1 ? true : false,
      },
    });
  }

  async update(req: Request, res: Response) {
    const { name, sex, birthDate, cpf, telephone } = req.body;
    const { id } = req.user;

    await knex("users")
      .update({
        name,
        sex,
        cpf,
        telephone,
        birth_date: birthDate,
      })
      .where({ id });

    return res.send();
  }

  async index(req: Request, res: Response) {
    const { id } = req.user;

    const data = await knex("users").where({ id }).first();

    res.send(data);
  }

  async changePassword(req: Request, res: Response) {
    const { id } = req.user;
    const { password, newPassword } = req.body;

    try {
      const { password: hashedPass } = await knex("users")
        .where({ id })
        .first();

      if (!(await bcrypt.compare(password, hashedPass)))
        return res.status(409).send({
          password: "Incorrect password.",
        });

      bcrypt.hash(newPassword, 8, async (err, hash) => {
        await knex("users")
          .update({
            password: hash,
          })
          .where({
            id,
          });

        res.sendStatus(200);
      });
    } catch (err) {
      console.log(err);
      throw new AppError("Internal server error.", 500);
    }
  }

  async validifyToken(req: Request, res: Response) {
    const { id } = req.user;

    const data = await knex("users").where({ id }).first();

    const { email, name } = data;

    return res.send({
      email,
      name,
    });
  }
}

function generateToken(params = {}, secret: string) {
  return jwt.sign(params, secret, {
    expiresIn: "3d",
  });
}

export default UserController;
