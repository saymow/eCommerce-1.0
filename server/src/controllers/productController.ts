import { Request, Response } from "express";
import connection from "../database/connection";

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
    const { page = 0, limit = 999 } : QueryList = req.query;

    const products = await connection("products")
      .select("id", "name", "price", "qntd", "image")
      .limit(limit)
      .offset((page - 1) * limit);

    const serializedProducts = products.map((product) => ({
      ...product,
      image: `http://localhost:3333/images/${product.image}.jpg`,
    }));

    if (page == 1) {
      const [count] = await connection("products").count();
      res.setHeader("X-Total-Count", count["count(*)"]);
    }

    console.log(serializedProducts);

    return res.json(serializedProducts);
  }

  async detailed(req: Request, res: Response) {
    const { product_id } = req.params;

    if (!product_id)
      return res
        .status(400)
        .json({ error: { message: "No product id passed." } });

    const product = await connection("products")
      .where("id", product_id)
      .first();

    if (!product)
      return res
        .status(400)
        .json({ error: { message: "Invalid product id." } });

    const serializedProduct = {
      ...product,
      image: `http://localhost:3333/images/${product.image}.jpg`
    }

    return res.json(serializedProduct);
  }
}

export default productManager;
