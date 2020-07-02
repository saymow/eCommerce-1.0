import React from "react";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../Context/index";

import {
  Container,
  CheckoutConainer,
  ProductRelated,
  TotalPrice,
  Products,
  Product,
  DeleteIcon,
  Information,
  Button
} from "./styles";

const Checkout: React.FC = () => {
  const {
    cartManager: { cart, totalCart, dispatch },
    userController: { loggedIn },
  } = useGlobalState();

  function handleDeleteProduct(id: number) {
    dispatch({
      type: "delete-product",
      payload: {
        id,
      }
    })
  }

  return (
    <Container>
      <CheckoutConainer>
        <ProductRelated>
          <Products>
            {cart.map((product) => (
              <Product>
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
                  <DeleteIcon onClick={() => handleDeleteProduct(product.id)}/>
                </div>
              </Product>
            ))}
          </Products>
          <TotalPrice>
            <h1>Total: R${totalCart}</h1>
          </TotalPrice>
        </ProductRelated>
        <Information>
          {loggedIn ? (
            <h1>Logado</h1>
          ) : (
            <>
              <h2>
                It looks like you are new here, try out create a new account, or
                a login if you are already registered.
              </h2>
              <div>
                <Button>SignIn</Button>
                <Button>SignUp</Button>
              </div>
            </>
          )}
        </Information>
      </CheckoutConainer>
    </Container>
  );
};

export default Checkout;
