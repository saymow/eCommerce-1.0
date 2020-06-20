import React, { useState } from "react";

import {
  Container,
  ShoppingIcon,
  BackDrop,
  Cart,
  Item,
  Button,
  ListItem,
} from "./styles";

const ShoppingCart: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <ShoppingIcon onClick={() => setShow(value => !value)} />
      <BackDrop className={show ? "show" : ""} onClick={() => setShow(false)} />

      <Cart className={show ? "show" : ""}>
        <ListItem>
          <Item>
            <div>
              <img
                src="https://boticario.vteximg.com.br/arquivos/ids/190060-1000-1000/Floratta_Blue_Des_Colonia_75_ml_25458_frontal.jpg?v=636414155995830000"
                alt="item"
              />
            </div>
            <div>
              <p>
                <strong>5x</strong>
                Perfume Oboticário ultra seda, cheiro de maçã.
              </p>
              <span>R$99.99</span>
            </div>
          </Item>

          <Item>
            <div>
              <img
                src="https://boticario.vteximg.com.br/arquivos/ids/190060-1000-1000/Floratta_Blue_Des_Colonia_75_ml_25458_frontal.jpg?v=636414155995830000"
                alt="item"
              />
            </div>
            <div>
              <p>
                <strong>5x</strong>
                Perfume Oboticário ultra seda, cheiro de maçã.
              </p>
              <span>R$99.99</span>
            </div>
          </Item>

          <Item>
            <div>
              <img
                src="https://boticario.vteximg.com.br/arquivos/ids/190060-1000-1000/Floratta_Blue_Des_Colonia_75_ml_25458_frontal.jpg?v=636414155995830000"
                alt="item"
              />
            </div>
            <div>
              <p>
                <strong>5x</strong>
                Perfume Oboticário ultra seda, cheiro de maçã.
              </p>
              <span>R$99.99</span>
            </div>
          </Item>

          <Item>
            <div>
              <img
                src="https://boticario.vteximg.com.br/arquivos/ids/190060-1000-1000/Floratta_Blue_Des_Colonia_75_ml_25458_frontal.jpg?v=636414155995830000"
                alt="item"
              />
            </div>
            <div>
              <p>
                <strong>5x</strong>
                Perfume Oboticário ultra seda, cheiro de maçã.
                Perfume Oboticário ultra seda, cheiro de maçã.
                Perfume Oboticário ultra seda, cheiro de maçã.
              </p>
              <span>R$99.99</span>
            </div>
          </Item>
        </ListItem>

        <Button>Check out</Button>
      </Cart>
    </Container>
  );
};

export default ShoppingCart;
