import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Checkout from "../CheckoutForm";

// import { Container } from './styles';

const Stripe: React.FC = () => {
  const ApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY as string;
  const StripePromise = loadStripe(ApiKey);

  return (
    <Elements stripe={StripePromise}>
      <Checkout />
    </Elements>
  );
};

export default Stripe;
