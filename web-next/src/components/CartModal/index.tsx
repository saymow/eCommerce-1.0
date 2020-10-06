import React from "react";
import { useHistory, Link } from "react-router-dom";

import { useGlobalState } from "../../context/index";

import ModalMockup from "../Modal";

import {
  Container,
  CartProducts,
  CartProduct,
  ModalOptions,
  ButtonsContainer,
  Button,
  DeleteIcon,
} from "./styles";

interface Props {
  closeModal: () => void;
}

const CartModal: React.FC<Props> = ({ closeModal }) => {
  const {
    cartManager: { cart, dispatch, totalCartConverted },
  } = useGlobalState();
  const history = useHistory();

  function handleContinueBuying() {
    history.replace("/products");
    closeModal();
  }

  function handleCheckout() {
    history.push("/checkout");
    closeModal();
  }

  function handleDeleteProduct(id: number) {
    dispatch({
      type: "delete-product",
      payload: {
        id,
      },
    });
  }

  return (
    <ModalMockup closeModal={closeModal}>
      <Container>
        <CartProducts>
          {cart.map((item) => (
            <CartProduct key={item.name}>
              <div>
                <Link
                  onClick={closeModal}
                  to={{
                    pathname: `product/${item.name}`,
                    state: {
                      id: item.id,
                    },
                  }}
                >
                  <img src={item.image} alt={item.name} />
                </Link>
              </div>
              <div>
                <p>
                  <strong>{item.qntd}x</strong>
                  {item.name}
                </p>
                <span>{item.convertedPrice}</span>

                <DeleteIcon onClick={() => handleDeleteProduct(item.id)} />
              </div>
            </CartProduct>
          ))}
        </CartProducts>

        <ModalOptions>
          <div>
            <h1>Total: {totalCartConverted}</h1>
          </div>
          <ButtonsContainer>
            <Button onClick={handleContinueBuying}>Continue buying</Button>
            <Button onClick={handleCheckout}>Checkout</Button>
          </ButtonsContainer>
        </ModalOptions>
      </Container>
    </ModalMockup>
  );
};

export default CartModal;
