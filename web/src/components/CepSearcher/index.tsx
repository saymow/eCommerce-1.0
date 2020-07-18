import React, { useState, FormEvent } from "react";
import { CircularProgress } from "@material-ui/core";

import { useGlobalState } from "../../Context";
import { useBuyingFlowState } from "../BuyingFlowManager";

import DeliveryManager from "../../Helper/deliveryRelated_helper";

import {
  Container,
  Form,
  TitleDiv,
  Input,
  Button,
  Shipping,
  ShippingSelf,
  ShippingIcon,
  Continue,
} from "./styles";

import { DeliveryResponse } from "../../Types/deliveryRelated_types";

const CepSearcher: React.FC = () => {
  const Api = new DeliveryManager();
  const { next } = useBuyingFlowState();

  const {
    buyingController: { dispatch },
    cartManager: { cart },
  } = useGlobalState();
  const [cep, setCep] = useState("");
  const [lastCepSearched, setlastCepSearched] = useState("");
  const [shippmentMethods, setshippmentMethods] = useState<
    DeliveryResponse[] | undefined
  >(undefined);
  const [methodChoosed, setMethodChoosed] = useState<
    DeliveryResponse | undefined
  >(undefined);
  const [apiLoading, setApiLoading] = useState(false);

  function handleCepUpdate(value: string) {
    let text = value.replace(/^(\d{5})(\d{1,3})/, "$1-$2");

    setCep(text);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    handleApiSearch();
  }

  async function handleApiSearch() {
    if (cep === lastCepSearched) return;
    setApiLoading(true);
    setlastCepSearched(cep);

    let qntdProducts = cart.reduce(
      (accumulator, item) => accumulator + item.qntd,
      0
    );

    const options = await Api.calcDelivery(cep, qntdProducts);

    if (!options) {
      return alert("Error");
    }

    setshippmentMethods(options);
    setApiLoading(false);
  }

  function handleCepChoosed() {
    if (!methodChoosed) return;

    const { Codigo, Metodo, PrazoEntrega, Valor } = methodChoosed;

    dispatch({
      type: "set-delivery",
      payload: {
        Codigo,
        Metodo,
        PrazoEntrega,
        Valor,
      },
    });

    next();
  }

  return (
    <Container>
      <TitleDiv trigger={shippmentMethods ? true : false}>
        <h1>We're shipping to the wholly country.</h1>
      </TitleDiv>

      <Form onSubmit={handleFormSubmit}>
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
          {apiLoading ? (
            <CircularProgress size={30} />
          ) : (
            <Button>Calculate shipping</Button>
          )}
        </div>
      </Form>
      {shippmentMethods && (
        <>
          <Shipping>
            {shippmentMethods?.map((item) => (
              <ShippingSelf
                key={item.Codigo}
                onClick={() => setMethodChoosed(item)}
                selected={item.Codigo === methodChoosed?.Codigo ? true : false}
              >
                <ShippingIcon />
                <h3>{item.Metodo}</h3>
                <strong>R${item.Valor}</strong>
                <p>
                  Prazo: <strong>{item.PrazoEntrega}</strong> dias úteis.
                </p>
              </ShippingSelf>
            ))}
          </Shipping>
          <Continue trigger={methodChoosed ? true : false}>
            <Button onClick={handleCepChoosed}>Continue</Button>
          </Continue>
        </>
      )}
    </Container>
  );
};

export default CepSearcher;
