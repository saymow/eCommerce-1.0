import React, { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

import { useGlobalState } from "../../Context/index";
import DeliveryManager from "../../Helper/deliveryRelated_helper";

import {
  Container,
  CheckoutConainer,
  ProductRelated,
  TotalPrice,
  Products,
  Product,
  DeleteIcon,
  Information,
  Form,
  TitleDiv,
  Input,
  Button,
  Shipping,
  ShippingSelf,
  ShippingIcon,
  Continue
} from "./styles";

import { DeliveryResponse } from "../../Types/deliveryRelated_types";

const Checkout: React.FC = () => {
  const {
    cartManager: { cart, totalCart, dispatch },
    userController: { loggedIn },
  } = useGlobalState();
  const Api = new DeliveryManager();

  const [cep, setCep] = useState("");
  const [shippmentMethods, setshippmentMethods] = useState<
    DeliveryResponse[] | undefined
  >(undefined);
  const [methodChoosed, setMethodChoosed] = useState<string>("");

  function handleDeleteProduct(id: number) {
    dispatch({
      type: "delete-product",
      payload: {
        id,
      },
    });
  }

  function handleCepUpdate(value: string) {
    let text = value.replace(/^(\d{5})(\d{1,3})/, "$1-$2");

    setCep(text);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    handleApiSearch();
  }

  async function handleApiSearch() {
    const options = await Api.calcDelivery(cep);

    console.log(options);

    if (options.find((option) => option.MsgErro)) return alert("Error");

    setshippmentMethods(options);
  }

  return (
    <Container>
      <CheckoutConainer>
        <ProductRelated>
          <Products>
            {cart.map((product) => (
              <Product>
                <div>
                  <Link
                    to={{
                      pathname: `/product/${product.name}`,
                      state: {
                        id: product.id,
                      },
                    }}
                  >
                    <img src={product.image} alt={product.name} />
                  </Link>
                </div>
                <div>
                  <p>
                    <strong>{product.qntd}x</strong>
                    {product.name}
                  </p>
                  <span>R${product.price}</span>
                  <DeleteIcon onClick={() => handleDeleteProduct(product.id)} />
                </div>
              </Product>
            ))}
          </Products>
          <TotalPrice>
            <h1>Total: R${totalCart}</h1>
          </TotalPrice>
        </ProductRelated>
        <Information>
          <TitleDiv trigger={shippmentMethods ? true : false}>
            <h1>We're shipping to the wholly country.</h1>
          </TitleDiv>

          <Form onSubmit={handleFormSubmit} trigger={shippmentMethods ? true : false}>
            <div>
              <Input
                type="text"
                placeholder="Type your cep here."
                pattern="(\d{5})(-{1})(\d{3})"
                maxLength={9}
                value={cep}
                onChange={(event) => handleCepUpdate(event.target.value)}
              />
            </div>
            <div>
              <Button>Calculate shipping</Button>
            </div>
          </Form >
          <Shipping>
            {shippmentMethods?.map((item) => (
              <ShippingSelf 
                onClick={() => setMethodChoosed(item.Codigo)}
                selected={item.Codigo === methodChoosed ? true : false}
              >
                <ShippingIcon />
                <h3>{item.Metodo}</h3>
                <strong>R${item.Valor}</strong>
                <p>Prazo: <strong>{item.PrazoEntrega}</strong> dias úteis.</p>
              </ShippingSelf>
            ))}
          </Shipping>
          {shippmentMethods && (
            <Continue trigger={methodChoosed ? true: false}>
              <Button>
                Continue
              </Button>
            </Continue>
          )}
        </Information>
      </CheckoutConainer>
    </Container>
  );
};

export default Checkout;
