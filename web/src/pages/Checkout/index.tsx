import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalState } from "../../Context/index";

import BuyingFlowManager from "../../Components/BuyingFlowManager/Controller";

import {
  Container,
  CheckoutContainer,
  ProductRelated,
  TotalPrice,
  Products,
  Product,
  DeleteIcon,
  Information,
} from "./styles";

const Checkout: React.FC = () => {
  const { pathname } = useLocation();
  const {
    cartManager: { cart, totalCart, dispatch },
    buyingController: { deliveryMethod, step },
  } = useGlobalState();

  function handleDeleteProduct(id: number) {
    dispatch({
      type: "delete-product",
      payload: {
        id,
      },
    });
  }

  let onlyRightSide = useMemo(() => {
    let routes = ["/checkout/address", "/checkout/authenticate/signup"];

    return routes.includes(pathname);
  }, [pathname]);

  return (
    <Container>
      <CheckoutContainer onlyRightSide={onlyRightSide}>
        <ProductRelated>
          <Products>
            {cart.map((product) => (
              <Product key={product.id} onlyRightSide={onlyRightSide}>
                <div>
                  <Link
                    to={{
                      pathname: `/product/${product.name}`,
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
                  {step === 1 && (
                    <DeleteIcon
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  )}
                </div>
              </Product>
            ))}
          </Products>
          <TotalPrice>
            <div>
              <p>Price: R${totalCart}</p>
              <p>Delivery: {deliveryMethod && `R$${deliveryMethod.price}`}</p>
              <h3>
                Total: R$
                {deliveryMethod
                  ? (Number(totalCart) + Number(deliveryMethod?.price)).toFixed(
                      2
                    )
                  : totalCart}
              </h3>
            </div>
          </TotalPrice>
        </ProductRelated>
        <Information>
          <BuyingFlowManager />
        </Information>
      </CheckoutContainer>
    </Container>
  );
};

export default Checkout;
