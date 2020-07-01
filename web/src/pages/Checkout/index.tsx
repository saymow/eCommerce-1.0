import React from "react";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../Context/index";

import {
  Container,
  CheckoutConainer,
  Products,
  Product,
  Information,
} from "./styles";

const Checkout: React.FC = () => {
  const {
    cartManager: { cart },
  } = useGlobalState();

  return (
    <Container>
      <CheckoutConainer>
        <Products>
          {cart.map((product) => (
            <Product>
              <div>
                <Link to={{
                  pathname: `/product/${product.name}`,
                  state: {
                    id: product.id
                  }
                }}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>
              <div>
                <p>
                  <strong>{product.qntd}x</strong>
                  {product.name}
                </p>
                <span>R${product.price}</span>
              </div>
            </Product>
          ))}
        </Products>
        <Information></Information>
      </CheckoutConainer>
    </Container>
  );
};

export default Checkout;
