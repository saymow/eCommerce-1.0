import React, { useEffect, useState } from "react";

import { useGlobalState } from "../../../Context";
import LoadingBars from "../../../Components/LoadingBars";

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
  Message,
  SadIcon,
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

const formatOrderDate = (dateStr: string) => {
  const now = new Date();
  const date = new Date(dateStr);

  const timeDiff = now.getTime() - date.getTime();
  const minutes = Math.floor(timeDiff / (1000 * 60));

  if (minutes < 1) {
    return "Just now";
  } else if (minutes < 60) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (minutes < 60 * 24) {
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

const History: React.FC = () => {
  const {
    UserApi,
    modalController: { dispatch: modalDispatch },
  } = useGlobalState();
  const [orderHistory, setOrderHistory] = useState<PropsOrderHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await UserApi.getOrderHistory();

        const serializedData = (data ?? []).map(
          ({
            raw_price,
            shipment_price,
            created_at,
            products,
            ...props
          }: PropsOrderHistoryServer) => {
            const serializedProducts = products.map(({ price, ...props }) => ({
              ...props,
              price: priceFormater(price),
            }));

            return {
              ...props,
              createdDate: formatOrderDate(created_at),
              products: serializedProducts,
              raw_price: priceFormater(raw_price),
              shipment_price: priceFormater(shipment_price),
              total_price: priceFormater(raw_price + shipment_price),
            };
          }
        );

        setOrderHistory(serializedData);
      } catch (err) {
        const { message } = err.response.data;
        modalDispatch({
          type: "error",
          payload: {
            title: "Network connection error",
            message,
          },
        });
      }

      setIsLoading(false);
    })();
  }, [UserApi, modalDispatch]);

  return isLoading ? (
    <LoadingBars />
  ) : (
    <Container>
      {orderHistory.length === 0 ? (
        <Message>
          <h1>You haven't bought anything yet.</h1>
          <SadIcon />
          <p>Give us a chance!</p>
        </Message>
      ) : (
        <ItemList>
          {orderHistory.map(
            (
              {
                id,
                raw_price,
                shipment_price,
                total_price,
                createdDate,
                delivered_at,
                status,
                address: {
                  state,
                  city,
                  neighborhood,
                  postalCode,
                  street,
                  number,
                },
                products,
              },
              i
            ) => (
              <ListItem key={i}>
                <MainInfo>
                  <h2>
                    <span>Id</span>: {id}
                  </h2>
                  <p>
                    <span>Price</span>: {raw_price}
                  </p>
                  <p>
                    <span>Shipment price</span>: {shipment_price}
                  </p>
                  <TotalPrice>
                    <span>Total</span>: {total_price}
                  </TotalPrice>
                  <p>
                    <span>Placed at</span>: {createdDate}
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
                    <span>Postal code</span>: {postalCode}
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
                    <Product key={name}>
                      <div>
                        <a
                          href={"http://localhost:3000/product/" + name}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src={image} alt="product" />
                        </a>
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
      )}
    </Container>
  );
};

export default History;
