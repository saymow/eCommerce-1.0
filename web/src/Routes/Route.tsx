import React from "react";
import { BrowserRouter, Switch, Route,  } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Main from "../Pages/Main";
import Products from "../Pages/Products";
import Checkout from "../Pages/Checkout";
import Product from "../Pages/Product";

import ModalManager from "../Components/ModalManager";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/product/:name" component={Product} />
        <Route path="/products" component={Products} />
        <Route path="/checkout" component={Checkout} />
      </Switch>
      <ModalManager />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
