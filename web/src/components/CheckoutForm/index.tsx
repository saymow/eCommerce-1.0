import React from "react";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

import { useGlobalState } from "../../Context";
import { useBuyingFlowState } from "../BuyingFlowManager";

import { Container } from "./styles";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { UserApi } = useBuyingFlowState();
  const {
    buyingController: { address, deliveryMethod },
    cartManager: { totalCart, cart },
  } = useGlobalState();

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;
    const creditCardInfo = elements.getElement(CardElement);
    if (!creditCardInfo) return;

    const { token, error } = await stripe.createToken(creditCardInfo);

    if (error) return console.log(error);

    console.log(token, error);

    if (!address || !deliveryMethod) return;

    const order = await UserApi.checkout({
      token,
      address,
      shippment: deliveryMethod,
      cartData: {
        cart,
        totalCart,
      },
    });

    console.log(order);
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <CardElement />
        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default CheckoutForm;
