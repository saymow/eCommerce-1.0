import React, { useRef } from 'react';

import { useGlobalState } from "../../context/index";

import Modal from "../Modal";

import { Container, CartProducts, CartProduct, ModalOptions } from './styles';

const CartModal: React.FC = () => {
  const {
    cartManager: { cart, dispatch, totalCart },
  } = useGlobalState();
  const modalRef = useRef<{
    openModal: () => null;
  }>(null);

  console.log("test")

  return (
    <Modal ref={modalRef}>
        <Container>
          <CartProducts>
            {cart.map(item => (
              <CartProduct key={item.name}>
                <div>
                  <img src={item.image} alt={item.name}/>
                </div>
                <div>
                  <p>
                    <strong>{item.qntd}x</strong>
                    {item.name}
                  </p>
                  <span>R${item.price}</span>
                </div>
              </CartProduct>
            )) }
            
          </CartProducts>

          <ModalOptions></ModalOptions>
        </Container>
      </Modal>
  );
}

export default CartModal;