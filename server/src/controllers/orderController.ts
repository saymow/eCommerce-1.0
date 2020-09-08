import { Request, Response } from "express";
import knex from "../database/connection";

import postCharge from "../services/payment";
import AppError from "../errors/AppError";
import { urlFormater } from "../utils/formaters";

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
  postalCode: string;
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
      const [{ name }] = await trx("users").where({ id });

      const products = cartData.cart as IProduct[];
      const raw_price = cartData.totalCart;
      const shipment_price = Math.floor(Number(shippment.price) * 100);

      const amount = Math.round(raw_price + shipment_price);

      if (!address.id) {
        await trx("addresses").insert({
          ...address,
          user_id: id,
        });
      }

      let [address_id] = await trx("order_address")
        .insert({
          state: address.state,
          city: address.city,
          neighborhood: address.neighborhood,
          street: address.street,
          number: address.number,
          postalCode: address.postalCode,
        })
        .returning("id");

      const [order_id] = await trx("orders")
        .insert({
          address_id,
          user_id: id,
          status: "Processing",
          raw_price,
          shipment_price,
        })
        .returning("id");

      const serializedPurchase_products = products.map((product) => ({
        order_id,
        product_id: product.id,
      }));

      await trx("order_products").insert(serializedPurchase_products);

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
      throw new AppError("Order error, please retry later.", 400);
    }
  }

  async list(req: Request, res: Response) {
    const { id } = req.user;

    const data: IPurchase[] = await knex("orders")
      .select(
        "orders.id",
        "orders.status",
        "orders.raw_price",
        "orders.shipment_price",
        "orders.created_at",
        "orders.delivered_at",
        "order_address.state",
        "order_address.city",
        "order_address.neighborhood",
        "order_address.postalCode",
        "order_address.street",
        "order_address.number",
        knex.raw(
          "array_to_string(array_agg(products.name ||';'|| products.price ||';'|| products.image), ',') as products"
        )
      )
      .join("order_address", "orders.address_id", "order_address.id")
      .join("order_products", "order_products.order_id", "orders.id")
      .join("products", "products.id", "order_products.product_id")
      .where("orders.user_id", id)
      .groupBy("orders.id", "order_address.id");

    const serializedData = data.map(
      ({
        products,
        state,
        city,
        neighborhood,
        street,
        postalCode,
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
              image: urlFormater(`images/products/${image}.jpg`),
            };
          });

        return {
          ...props,
          products: orderProductsFormatedArray,
          address: { state, city, neighborhood, street, number, postalCode },
        };
      }
    );

    return res.send(serializedData);
  }
}

export default OrderController;
