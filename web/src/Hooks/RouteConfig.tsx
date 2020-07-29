import React, { useMemo } from "react";

import CepSearcher from "../Components/CepSearcher";
import Authenticate from "../Components/Authenticate";
import AddressForm from "../Components/AddressForm";
import Stripe from "../Components/StripeProvider";
import CompletedBuy from "../Components/CompletedBuy";

import { Steps } from "../Types/buyingFlowRelated_types";

interface RouteConfigProps {
  name: string;
  path: string;
  step: Steps;
  exact?: boolean;
  auth: boolean;
  component: React.FC;
}

export function useShoppingRoutes(LoggedIn: boolean) {
  const routes = useMemo(() => {
    const AvailableRoutes: RouteConfigProps[] = [
      {
        name: "Shippment method",
        path: "/checkout",
        step: 1,
        exact: true,
        auth: false,
        component: CepSearcher,
      },
      {
        name: "Authenticate",
        path: "/checkout/authenticate",
        step: 2,
        auth: false,
        component: Authenticate,
      },
      {
        name: "Address",
        path: "/checkout/address",
        step: 3,
        auth: true,
        component: AddressForm,
      },
      {
        name: "Finish Buy",
        path: "/checkout/finish_buy",
        step: 4,
        auth: true,
        component: Stripe,
      },
      {
        name: "completed",
        path: "/checkout/buy_completed",
        step: 5,
        auth: true,
        component: CompletedBuy,
      },
    ];
    if (LoggedIn)
      return AvailableRoutes.filter((route) => route.name !== "Authenticate");

    return AvailableRoutes;
  }, [LoggedIn]);

  return routes;
}
