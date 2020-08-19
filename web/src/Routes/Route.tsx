import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { useGlobalState } from "../Context";

import RestrictedRoute from "../Components/RestrictedRoute";

import MainHead from "../Heads/Main";

import Main from "../Pages/Main";
import Products from "../Pages/Products";
import Checkout from "../Pages/Checkout";
import Product from "../Pages/Product";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Profile from "../Pages/Profile";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import ModalManager from "../Components/ModalManager";

const Routes: React.FC = () => {
  const {
    userController: { loggedIn },
  } = useGlobalState();

  return (
    <>
      <MainHead />
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/products" component={Products} />
          <Route path="/product/:name" component={Product} />
          <RestrictedRoute
            authenticated={false}
            path="/signin"
            component={SignIn}
          />
          <RestrictedRoute
            authenticated={false}
            path="/signup"
            component={SignUp}
          />
          <RestrictedRoute
            authenticated
            path={[
              "/profile/me",
              "/profile/history",
              "/profile/address",
              "/profile/change_password",
            ]}
            component={Profile}
          />
          <Route
            path={[
              "/checkout",
              "/checkout/authenticate",
              "/checkout/address",
              "/checkout/finish_buy",
              "/checkout/buy_completed",
            ]}
            component={Checkout}
          />
        </Switch>
        <ModalManager />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default Routes;
