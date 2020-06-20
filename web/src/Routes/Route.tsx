import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../pages/Main";
import Products from '../pages/Products';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/products" component={Products} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
