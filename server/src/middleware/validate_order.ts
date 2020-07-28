import { Request, Response, NextFunction } from "express";

import knex from "../database/connection";

interface Product {
  id: number;
  name: string;
  image: string;
  price: string;
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

  const formatedPrice = Number(totalCart).toFixed(2);

  const productsIds = cart.map((product: Product) => product.id);

  const selectedProducts: Product[] = await knex("products").whereIn(
    "id",
    productsIds
  );

  const expectedPrice = selectedProducts
    .reduce((accumulator, product) => {
      const { qntd } = cart.find(
        (cartProduct: Product) => cartProduct.id === product.id
      );

      return accumulator + Number(product.price) * qntd;
    }, 0)
    .toFixed(2);

  if (formatedPrice !== expectedPrice)
    return res.status(401).json({
      message: "Data provided does not match with our database.",
    });

  return next();
}
