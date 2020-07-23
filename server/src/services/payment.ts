import { Request, Response } from "express";
import Stripe from "stripe";
import knex from "../database/connection";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2020-03-02",
  typescript: true,
});

async function postCharge(req: Request, res: Response) {
  try {
    const {
      data: { address, shippment, cartData, token },
      id,
    } = req.body;

    console.log(req.body);

    const { email } = await knex("users").where({ id }).first();

    const amount = Math.round(
      (Number(cartData.totalCart) + Number(shippment.price)) * 100
    );

    const charge = await stripe.charges.create({
      amount,
      currency: "brl",
      source: token.id,
      receipt_email: email,
    });

    if (!charge) throw new Error("charge unsuccessful");

    res.status(200).json({
      message: "charge posted successfully",
      charge,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

export default postCharge;
