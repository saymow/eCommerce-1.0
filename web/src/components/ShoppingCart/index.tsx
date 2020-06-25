import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useGlobalState } from "../../context/index";

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
} from "./styles";

const ShoppingCart: React.FC = () => {
  const history = useHistory();
  const { cartManager: {cart, totalCart} } = useGlobalState();
  const [show, setShow] = useState(false);

  return (
    <Container>
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
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div>
                    <p>
                      <strong>{product.qntd}x</strong>
                      {product.name}
                    </p>
                    <span>R${product.price}</span>
                  </div>
                </Item>
              ))}
            </ListItem>
            <Checkout>
              <strong>Total: R${totalCart}</strong>

              <Button onClick={() => history.push("checkout")}>Check out</Button>
            </Checkout>
          </>
        )}
      </Cart>
    </Container>
  );
};

export default ShoppingCart;
