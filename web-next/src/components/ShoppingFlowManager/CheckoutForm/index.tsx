import React, { useState } from "react";
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";

import { useGlobalState } from "../../../context";
import { useBuyingFlowState } from "../Controller";

import Loading from "../../LoadingBars";

import { Container, Title, Form, Button, ErrorSpan } from "./styles";

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { setReceipt_url, next } = useBuyingFlowState();
  const {
    buyingController: { address, deliveryMethod, dispatch },
    cartManager: { totalCart, totalCartConverted, cart },
    modalController: { dispatch: modalDispatch },
    UserApi,
  } = useGlobalState();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault();
    try {
      if (!stripe || !elements) throw new Error("Payment api error.");
      const creditCardInfo = elements.getElement(CardElement);
      if (!creditCardInfo) throw new Error("Payment api error.");

      const { token, error } = await stripe.createToken(creditCardInfo);

      if (error) return setErrorMessage(error.message as string);

      if (!address || !deliveryMethod)
        throw new Error(
          "Buying flow has failed. Please restart the process of buy."
        );

      setIsLoading(true);

      const response = await UserApi.postOrder({
        token,
        address,
        shippment: deliveryMethod,
        cartData: {
          cart,
          totalCart,
          totalCartConverted,
        },
      });

      if (response.error) throw new Error(response.error);

      setReceipt_url(response);
      dispatch({
        type: "set-finished-buy",
      });

      next();
    } catch (err) {
      setIsLoading(false);
      const message = String(err.message | err.response.data.message);
      modalDispatch({
        type: "error",
        payload: {
          title: "Network connection error",
          message,
        },
      });
    }
  }

  return (
    <Container>
      {isLoading ? (
        <Loading barQntd={5} delay={200} height={"30%"} width={"30%"} />
      ) : (
        <>
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
                    backgroundColor: "var(--background-secondary)",
                    fontSize: "30px",
                    color: "var(--primary)",
                  },
                },
              }}
            />
            <Button type="submit">Checkout</Button>
          </Form>
        </>
      )}
    </Container>
  );
};

export default CheckoutForm;
