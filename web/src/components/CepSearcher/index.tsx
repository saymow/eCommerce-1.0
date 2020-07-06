import React, { useState, FormEvent } from "react";

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

  const [cep, setCep] = useState("");
  const [lastCepSearched, setlastCepSearched] = useState("");
  const [shippmentMethods, setshippmentMethods] = useState<
    DeliveryResponse[] | undefined
  >(undefined);
  const [methodChoosed, setMethodChoosed] = useState("");

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

    setlastCepSearched(cep);

    const options = await Api.calcDelivery(cep);

    if (options.find((option) => option.MsgErro)) return alert("Error");

    setshippmentMethods(options);
  }
  return (
    <Container>
      <TitleDiv trigger={shippmentMethods ? true : false}>
        <h1>We're shipping to the wholly country.</h1>
      </TitleDiv>

      <Form
        onSubmit={handleFormSubmit}
        trigger={shippmentMethods ? true : false}
      >
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
      </Form>
      {shippmentMethods && (
        <>
          <Shipping>
            {shippmentMethods?.map((item) => (
              <ShippingSelf
                key={item.Codigo}
                onClick={() => setMethodChoosed(item.Codigo)}
                selected={item.Codigo === methodChoosed ? true : false}
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
            <Button>Continue</Button>
          </Continue>
        </>
      )}
    </Container>
  );
};

export default CepSearcher;
