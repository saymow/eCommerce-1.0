import React from "react";

import { Container, Button } from './styles';

const CheckoutRegister: React.FC = () => {
  return (
    <Container>
      <h2>
        It looks like you are new here, try out create a new account, or a login
        if you are already registered.
      </h2>
      <div>
        <Button>SignIn</Button>
        <Button>SignUp</Button>
      </div>
    </Container>
  );
};

export default CheckoutRegister;
