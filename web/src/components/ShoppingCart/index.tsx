import React, { useState, useMemo } from "react";
import { useHistory, Link } from "react-router-dom";

import { useGlobalState } from "../../Context/index";

import {
  Container,
  ShoppingIcon,
  BackDrop,
  Cart,
  Item,
  Checkout,
  Button,
  ListItem,
  EmptyBag,
  EmptyBagIcon,
  DeleteIcon,
} from "./styles";

const ShoppingCart: React.FC = () => {
  const history = useHistory();
  const {
    cartManager: { totalCart, cart, dispatch },
    buyingController: { step },
  } = useGlobalState();
  const [show, setShow] = useState(false);

  const qntdItems = useMemo(() => {
    return cart.reduce((accumulator, item) => {
      return accumulator + (item.qntd ? item.qntd : 1);
    }, 0);
  }, [cart]);

  function handleDeleteCartItem(id: number) {
    dispatch({
      type: "delete-product",
      payload: {
        id,
      },
    });
  }

  return (
    <Container qntd={qntdItems}>
      <ShoppingIcon onClick={() => setShow((value) => !value)} />
      <BackDrop className={show ? "show" : ""} onClick={() => setShow(false)} />

      <Cart className={show ? "show" : ""}>
        {cart.length === 0 ? (
          <EmptyBag>
            <h5>Your bag is empty</h5>
            <p>You havent added any products to card yet.</p>
            <EmptyBagIcon />
          </EmptyBag>
        ) : (
          <>
            <ListItem>
              {cart.map((product) => (
                <Item key={product.id}>
                  <div>
                    <Link
                      to={{
                        pathname: `/product/${product.image}`,
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
                    {step === 1 && (
                      <DeleteIcon
                        onClick={() => handleDeleteCartItem(product.id)}
                      />
                    )}
                  </div>
                </Item>
              ))}
            </ListItem>
            <Checkout>
              <strong>Total: R${totalCart}</strong>

              <Button onClick={() => history.push("/checkout")}>
                Check out
              </Button>
            </Checkout>
          </>
        )}
      </Cart>
    </Container>
  );
};

export default ShoppingCart;