import { Request, Response } from "express";
import knex from "../database/connection";
import jwt from "jsonwebtoken";

import emailController from "../services/mailer";
import AppError from "../errors/AppError";
import { urlFormater } from "../utils/formaters";

class UserConfirmationController {
  async toggleSignNewsletter(req: Request, res: Response) {
    const { id } = req.user;

    const [{ email_signed, confirmed }] = await knex("users")
      .select("email_signed", "confirmed")
      .where({ id });

    if (!confirmed) throw new AppError("User has to confirm email first", 400);

    await knex("users").update({ email_signed: !email_signed }).where({ id });

    res.send();
  }

  async sendConfirmationEmail(req: Request, res: Response) {
    const { id } = req.user;

    const [{ email, name, confirmed }] = await knex("users")
      .select("email", "confirmed")
      .where({ id });

    if (confirmed) throw new AppError("User already has confirmed email", 400);

    const token = jwt.sign(
      { email },
      process.env.JWT_CONFIRMATION_EMAIL_SECRET as string,
      {
        expiresIn: "3h",
      }
    );

    await emailController.sendEmail({
      to: {
        name,
        address: email,
      },
      subject: "Confirmation email",
      body:
        "<h1>Here is the confirmation email link you're looking for ;D <h1>" +
        `<a href=${urlFormater(
          "users/confirmation/" + token
        )}>Click here</a>`,
    });

    return res.send();
  }

  async receiveConfirmationEmail(req: Request, res: Response) {
    const { token } = req.params;

    jwt.verify(
      token,
      process.env.JWT_CONFIRMATION_EMAIL_SECRET as string,
      async (err, decoded: { email?: string } | undefined) => {
        if (err || !decoded) throw new AppError("Invalid token", 400);

        const email = decoded.email as string;

        await knex("users")
          .update({ confirmed: true, email_signed: true })
          .where({ email });

        return res.redirect("e-commerce1.netlify.app/profile/me");
      }
    );
  }
}

export default UserConfirmationController;
