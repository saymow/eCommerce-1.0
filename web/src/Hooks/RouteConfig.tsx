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
  availablePaths?: string[];
  step: Steps;
  exact?: boolean;
  auth: boolean;
  component: React.FC;
}

export function useShoppingRoutes(LoggedIn: boolean) {
  const routes = useMemo(() => {
    let AvailableRoutes = [
      {
        name: "Shippment method",
        path: "/checkout",
        exact: true,
        auth: false,
        component: CepSearcher,
      },
      {
        name: "Authenticate",
        path: "/checkout/authenticate",
        auth: false,
        component: Authenticate,
      },
      {
        name: "Address",
        path: "/checkout/address",
        auth: true,
        component: AddressForm,
      },
      {
        name: "Finish Buy",
        path: "/checkout/finish_buy",
        auth: true,
        component: Stripe,
      },
      {
        name: "completed",
        path: "/checkout/buy_completed",
        auth: true,
        component: CompletedBuy,
      },
    ];

    if (LoggedIn)
      AvailableRoutes = AvailableRoutes.filter(
        (route) => route.name !== "Authenticate"
      );

    let RoutesWithRespectiveStep = AvailableRoutes.map((route, index) => {
      let availablePaths;
      if (index < AvailableRoutes.length - 1) {
        availablePaths = AvailableRoutes.map((route2) => route2.path);

        console.log(
          "route: ",
          route.path,
          "\navailablePaths :",
          availablePaths.join(" ")
        );
      }

      return {
        ...route,
        availablePaths,
        step: index + 1,
      } as RouteConfigProps;
    });

    return RoutesWithRespectiveStep;
  }, [LoggedIn]);

  return routes;
}
