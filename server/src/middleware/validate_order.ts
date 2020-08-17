import { Request, Response, NextFunction } from "express";

import knex from "../database/connection";
import AppError from "../errors/AppError";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  qntd: number;
}

export default async function validateOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    data: {
      cartData: { totalCart, cart },
    },
  } = req.body;

  const productsIds = cart.map((product: Product) => product.id);

  const selectedProducts: Product[] = await knex("products").whereIn(
    "id",
    productsIds
  );

  const expectedPrice = selectedProducts.reduce((accumulator, product) => {
    const { qntd } = cart.find(
      (cartProduct: Product) => cartProduct.id === product.id
    );

    return accumulator + product.price * qntd;
  }, 0);

  if (totalCart !== expectedPrice)
    throw new AppError("Data provided does not match with our database.", 400);

  return next();
}
