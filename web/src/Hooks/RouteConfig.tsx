import React, { useMemo, useState, useEffect } from "react";

import CepSearcher from "../Components/ShoppingFlowManager/CepSearcher";
import Authenticate from "../Components/ShoppingFlowManager/Authenticate";
import AddressForm from "../Components/ShoppingFlowManager/AddressForm";
import Stripe from "../Components/ShoppingFlowManager/StripeProvider";
import CompletedBuy from "../Components/ShoppingFlowManager/CompletedBuy";

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

export function useShoppingRoutes(loggedIn: boolean, currentStep: number) {
  const [loggedStatus, setLoggedStatus] = useState<boolean | null>(null);

  useEffect(() => {
    if (currentStep === 1) setLoggedStatus(loggedIn);
  }, [loggedIn, currentStep]);

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

    if (loggedStatus)
      AvailableRoutes = AvailableRoutes.filter(
        (route) => route.name !== "Authenticate"
      );

    let RoutesWithRespectiveStep = AvailableRoutes.map((route, index) => {
      let availablePaths;
      if (index > 0 && index < AvailableRoutes.length - 1) {
        availablePaths = [AvailableRoutes[index + 1].path];
        if (route.name === "Authenticate") {
          availablePaths.push("/checkout/authenticate");
        }
      }

      return {
        ...route,
        availablePaths,
        step: index + 1,
      } as RouteConfigProps;
    });

    return RoutesWithRespectiveStep;
  }, [loggedStatus]);

  return routes;
}
