import { Request, Response } from "express";
import knex from "../database/connection";

import postCharge from "../services/payment";
import AppError from "../errors/AppError";

interface IProduct {
  id: number;
}

interface IPurchase {
  id: number;
  status: string;
  raw_price: number;
  shipment_price: number;
  created_at: string;
  delivered_at?: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: number;
  cep: string;
  products: string;
}

class OrderController {
  async post(req: Request, res: Response) {
    const { id } = req.user;
    const {
      data: { address, shippment, cartData, token },
    } = req.body;

    const trx = await knex.transaction();

    try {
      const { name } = await trx("users").where({ id }).first();

      const products = cartData.cart as IProduct[];
      const raw_price = Number(cartData.totalCart) * 100;
      const shipment_price = Number(shippment.price) * 100;

      const amount = Math.round(raw_price + shipment_price);

      if (!address.id) {
        let [address_id] = await trx("address").insert({
          ...address,
          cep: shippment.cep,
          user_id: id,
        });

        address.id = address_id;
      }

      const [order_id] = await trx("purchases").insert({
        user_id: id,
        status: "Processing",
        raw_price,
        shipment_price,
        address_id: address.id,
      });

      const serializedPurchase_products = products.map((product) => ({
        product_id: product.id,
        purchase_id: order_id,
      }));

      await trx("purchase_products").insert(serializedPurchase_products);

      const charge = await postCharge({
        name,
        address,
        amount,
        shippment,
        token,
      });

      if (!charge) throw new Error("charge unsuccessful");

      await trx.commit();

      res.status(200).json({
        message: "charge posted successfully",
        charge,
      });
    } catch (err) {
      await trx.rollback();
      console.log(err);
      throw new AppError("Order error, please retry later.", 400);
    }
  }

  async list(req: Request, res: Response) {
    const { id } = req.user;

    const data: IPurchase[] = await knex("purchases")
      .select(
        "purchases.id",
        "purchases.status",
        "purchases.raw_price",
        "purchases.shipment_price",
        "purchases.created_at",
        "purchases.delivered_at",
        "address.state",
        "address.city",
        "address.neighborhood",
        "address.cep",
        "address.street",
        "address.number",
        knex.raw(
          "GROUP_CONCAT(products.name||';'||products.price||';'||products.image) as products"
        )
      )
      .join("address", "purchases.address_id", "address.id")
      .join(
        "purchase_products",
        "purchase_products.purchase_id",
        "purchases.id"
      )
      .join("products", "products.id", "purchase_products.product_id")
      .where("purchases.user_id", id)
      .groupBy("purchases.id");

    const serializedData = data.map(
      ({
        products,
        state,
        city,
        neighborhood,
        street,
        cep,
        number,
        ...props
      }) => {
        const orderProductsFormatedArray = products
          .split(",")
          .map((eachProduct) => {
            let [name, price, image] = eachProduct.split(";");

            return {
              name,
              price,
              image: `http://localhost:3333/images/${image}.jpg`,
            };
          });

        return {
          ...props,
          address: { state, city, neighborhood, street, number, cep },
          products: orderProductsFormatedArray,
        };
      }
    );

    return res.send(serializedData);
  }
}

export default OrderController;
