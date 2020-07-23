import React, { useState } from "react";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

import { useGlobalState } from "../../Context";
import { useBuyingFlowState } from "../BuyingFlowManager";

import { Container, Title, Form, Button, ErrorSpan } from "./styles";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { UserApi } = useBuyingFlowState();
  const {
    buyingController: { address, deliveryMethod },
    cartManager: { totalCart, cart },
  } = useGlobalState();

  const [errorMessage, setErrorMessage] = useState("");

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) return;
    const creditCardInfo = elements.getElement(CardElement);
    if (!creditCardInfo) return;

    const { token, error } = await stripe.createToken(creditCardInfo);

    if (error) return setErrorMessage(error.message as string);

    console.log(token);

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
    <Container>
      <Title>Credit Card info</Title>
      <ErrorSpan className={errorMessage ? "show" : ""}>
        {errorMessage}
      </ErrorSpan>
      <Form onSubmit={handleFormSubmit}>
        <CardElement
          onChange={() => errorMessage && setErrorMessage("")}
          options={{
            style: {
              base: {
                padding: 10,
                fontSize: "2rem",
                color: "var(--primary)",
              },
            },
          }}
        />
        <Button type="submit">Checkout</Button>
      </Form>
    </Container>
  );
};

export default CheckoutForm;
