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

  const productsIds = cart.map((product: Product) => product.id);

  const selectedProducts: Product[] = await knex("products").whereIn(
    "id",
    productsIds
  );

  const expectedPrice = selectedProducts.reduce(
    (accumulator, product, index) => {
      return accumulator + Number(product.price) * cart[index].qntd;
    },
    0
  );

  console.log(totalCart + " === " + expectedPrice);

  if (totalCart != expectedPrice)
    return res.status(401).json({
      message: "Data provided does not match with our database.",
    });

  return next();
}
