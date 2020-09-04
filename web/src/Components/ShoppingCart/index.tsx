import React, { useState, useMemo, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import { useGlobalState } from "../../Context/index";

import {
  Container,
  ShoppingIcon,
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
    cartManager: { totalCartConverted, cart, dispatch },
    buyingController: { step },
  } = useGlobalState();
  const [show, setShow] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

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

  function manageListener(event: any) {
    if (
      !containerRef.current?.contains(event.target) &&
      !cartRef.current?.contains(event.target)
    ) {
      setShow(false);
      document.removeEventListener("click", manageListener);
    }
  }

  function handleToggleCart() {
    if (!show) {
      setShow(true);
      document.addEventListener("click", manageListener);
    } else {
      setShow(false);
      document.removeEventListener("click", manageListener);
    }
  }

  return (
    <Container qntd={qntdItems} ref={containerRef}>
      <ShoppingIcon onClick={handleToggleCart} />

      <Cart className={show ? "show" : ""} ref={cartRef}>
        {cart.length === 0 ? (
          <EmptyBag>
            <h5>Your cart is empty</h5>
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
                        onClick={() => handleDeleteCartItem(product.id)}
                      />
                    )}
                  </div>
                </Item>
              ))}
            </ListItem>
            <Checkout>
              <strong>Total: {totalCartConverted}</strong>

              <Button
                onClick={() => {
                  history.push("/checkout");
                  handleToggleCart();
                }}
              >
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
