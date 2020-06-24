import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "../pages/Main";
import Products from "../pages/Products";
import Checkout from "../pages/Checkout";

import { Container } from "./styles";

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
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
