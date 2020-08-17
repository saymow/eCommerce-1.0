import React, { useEffect, useState } from "react";

import { useGlobalState } from "../../../Context";

import { priceFormater } from "../../../Utils/formaters";
import { Address } from "../../../Types/buyingFlowRelated_types";

import {
  Container,
  ListItem,
  ItemList,
  MainInfo,
  AddressInfo,
  ProductList,
  Product,
  TotalPrice,
} from "./styles";

interface OrderHistoryAddress extends Address {
  cep: string;
}

interface PropsOrderHistory {
  id: number;
  raw_price: number;
  shipment_price: number;
  total_price: number;
  status: string;
  createdDate: string;
  createdHour: string;
  delivered_at?: string;
  address: OrderHistoryAddress;
  products: Array<{
    name: string;
    price: string;
    image: string;
  }>;
}

interface PropsOrderHistoryServer {
  id: number;
  raw_price: number;
  shipment_price: number;
  total_price: number;
  status: string;
  created_at: string;
  delivered_at?: string;
  address: OrderHistoryAddress;
  products: Array<{
    name: string;
    price: number;
    image: string;
  }>;
}

const History: React.FC = () => {
  const [orderHistory, setOrderHistory] = useState<PropsOrderHistory[]>([]);
  const { UserApi } = useGlobalState();

  useEffect(() => {
    (async () => {
      const data = await UserApi.getOrderHistory();

      const serializedData = data.map(
        ({
          raw_price,
          shipment_price,
          created_at,
          products,
          ...props
        }: PropsOrderHistoryServer) => {
          let [createdDate, createdHour] = created_at.split(" ");

          const serializedProducts = products.map(({ price, ...props }) => ({
            ...props,
            price: priceFormater(price),
          }));

          return {
            ...props,
            createdDate,
            createdHour,
            products: serializedProducts,
            raw_price: priceFormater(raw_price),
            shipment_price: priceFormater(shipment_price),
            total_price: priceFormater(raw_price + shipment_price),
          };
        }
      );

      setOrderHistory(serializedData);
    })();
  }, [UserApi]);

  return (
    <Container>
      <ItemList>
        {orderHistory.map(
          ({
            id,
            raw_price,
            shipment_price,
            total_price,
            createdDate,
            createdHour,
            delivered_at,
            status,
            address: { state, city, neighborhood, cep, street, number },
            products,
          }) => (
            <ListItem>
              <MainInfo>
                <h2>
                  <span>Id</span>: {id}
                </h2>
                <p>
                  <span>Price</span>: {raw_price}
                </p>
                <p>
                  <span>Shipment_price</span>: {shipment_price}
                </p>
                <TotalPrice>
                  <span>Total</span>: {total_price}
                </TotalPrice>
                <p>
                  <span>Date</span>: {createdDate}
                </p>
                <p>
                  <span>Time</span>: {createdHour}
                </p>
                <p>
                  <span>Status</span>: {status}
                </p>
                {delivered_at && (
                  <p>
                    <span>Deliverd at</span>: {delivered_at}
                  </p>
                )}
              </MainInfo>
              <AddressInfo>
                <h3>Address</h3>
                <p>
                  <span>State</span>: {state}
                </p>
                <p>
                  <span>City</span>: {city}
                </p>
                <p>
                  <span>Neighborhood</span>: {neighborhood}
                </p>
                <p>
                  <span>Cep</span>: {cep}
                </p>
                <p>
                  <span>Street</span>: {street}
                </p>
                <p>
                  <span>Number</span>: {number}
                </p>
              </AddressInfo>

              <ProductList>
                {products.map(({ name, price, image }) => (
                  <Product>
                    <div>
                      <img src={image} alt="product" />
                    </div>
                    <div>
                      <p>
                        <span>Name</span>: {name}
                      </p>
                      <p>
                        <span>Price</span>: {price}
                      </p>
                    </div>
                  </Product>
                ))}
              </ProductList>
            </ListItem>
          )
        )}
      </ItemList>
    </Container>
  );
};

export default History;
