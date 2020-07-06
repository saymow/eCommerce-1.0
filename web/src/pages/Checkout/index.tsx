import React from "react";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../Context/index";

import BuyingFlowManager from "../../Components/BuyingFlowManager";

import {
  Container,
  CheckoutConainer,
  ProductRelated,
  TotalPrice,
  Products,
  Product,
  DeleteIcon,
  Information,
} from "./styles";


const Checkout: React.FC = () => {
  const {
    cartManager: { cart, totalCart, dispatch },
  } = useGlobalState();
  
  function handleDeleteProduct(id: number) {
    dispatch({
      type: "delete-product",
      payload: {
        id,
      },
    });
  }

  return (
    <Container>
      <CheckoutConainer>
        <ProductRelated>
          <Products>
            {cart.map((product) => (
              <Product key={product.id}>
                <div>
                  <Link
                    to={{
                      pathname: `/product/${product.name}`,
                      state: {
                        id: product.id,
                      },
                    }}
                  >
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
                <div>
                  <p>
                    <strong>{product.qntd}x</strong>
                    {product.name}
                  </p>
                  <span>R${product.price}</span>
                  <DeleteIcon onClick={() => handleDeleteProduct(product.id)} />
                </div>
              </Product>
            ))}
          </Products>
          <TotalPrice>
            <h1>Total: R${totalCart}</h1>
          </TotalPrice>
        </ProductRelated>
        <Information>
          <BuyingFlowManager />
        </Information>
      </CheckoutConainer>
    </Container>
  );
};

export default Checkout;
