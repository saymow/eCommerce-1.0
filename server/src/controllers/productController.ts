import { Request, Response } from "express";
import connection from "../database/connection";
import AppError from "../errors/AppError";

import { cachefy } from "../services/cache";

interface QueryList {
  page?: number;
  limit?: number;
}

class productManager {
  async create(req: Request, res: Response) {
    const { name, description, price, qntd } = req.body;
    const image = req.file.filename;

    await connection("products").insert({
      name,
      description,
      price,
      image,
      qntd,
    });

    return res.json();
  }

  async list(req: Request, res: Response) {
    const { page = 0, limit = 999 }: QueryList = req.query;

    const products = await connection("products")
      .select("id", "name", "price", "qntd", "image")
      .limit(limit)
      .offset((page - 1) * limit);

    const serializedProducts = products.map((product) => ({
      ...product,
      image: `http://localhost:3333/images/products/${product.image}.jpg`,
    }));

    if (page == 1) {
      const [count] = await connection("products").count();
      res.setHeader("X-Total-Count", count["count(*)"]);
    }

    cachefy("products", serializedProducts);

    return res.json(serializedProducts);
  }

  async detailed(req: Request, res: Response) {
    const { name } = req.params;

    if (!name) throw new AppError("No product name provided.", 400);

    const product = await connection("products").where("name", name).first();

    if (!product) throw new AppError("Invalid product name.", 400);

    const serializedProduct = {
      ...product,
      image: `http://localhost:3333/images/products/${product.image}.jpg`,
    };

    cachefy(`product ${name}`, serializedProduct);

    return res.json(serializedProduct);
  }
}

export default productManager;
