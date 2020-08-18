import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalState } from "../../Context/index";
import { priceFormater } from "../../Utils/formaters";

import BuyingFlowManager from "../../Components/ShoppingFlowManager/Controller";

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
    cartManager: { cart, totalCart, totalCartConverted, dispatch },
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
                  <span>{product.convertedPrice}</span>
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
              <p>Price: {totalCartConverted}</p>
              <p>Delivery: {deliveryMethod && `R$${deliveryMethod.price}`}</p>
              <h3>
                Total:
                {deliveryMethod
                  ? priceFormater(
                      totalCart + Number(deliveryMethod?.price) * 100
                    )
                  : totalCartConverted}
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
