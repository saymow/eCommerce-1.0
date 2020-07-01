import React from "react";
import { useHistory, Link } from "react-router-dom";

import { useGlobalState } from "../../Context/index";

import ModalMockup from "../Modal";

import {
  Container,
  CartProducts,
  CartProduct,
  ModalOptions,
  ButtonsContainer,
  Button,
  DeleteIcon
} from "./styles";

import { Modal } from "../../Types/modalRelated_types";

const CartModal: React.FC<Modal> = ({ setShowModal }) => {
  const {
    cartManager: { cart, dispatch, totalCart },
  } = useGlobalState();
  const history = useHistory();

  function handleContinueBuying() {
    history.replace("/products");
    setShowModal(false);
  }

  function handleCheckout() {
    history.push("/checkout");
    setShowModal(false);
  }

  function handleDeleteProduct(id: number) {
    dispatch({
      type: "delete-product",
      payload: {
        id
      }
    })
  }

  return (
    <ModalMockup setShowModal={() => setShowModal(false)}>
      <Container>
        <CartProducts>
          {cart.map((item) => (
            <CartProduct key={item.name}>
              <div>
                <Link 
                onClick={() => setShowModal(false)}
                to={{
                  pathname: `product/${item.name}`,
                  state: {
                    id: item.id
                  }
                }}>
                  <img src={item.image} alt={item.name} />
                </Link>
              </div>
              <div>
                <p>
                  <strong>{item.qntd}x</strong>
                  {item.name}
                </p>
                <span>R${item.price}</span>

                <DeleteIcon onClick={() => handleDeleteProduct(item.id)}/>
              </div>
            </CartProduct>
          ))}
        </CartProducts>

        <ModalOptions>
          <div>
            <h1>Total: R${totalCart}</h1>
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
