import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={450} classNames="fade">
              <Switch location={location}>
                <Route path="/" exact component={Main} />
                <Route path="/products" component={Products} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/product/:name" component={Product} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
      <ModalManager />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
