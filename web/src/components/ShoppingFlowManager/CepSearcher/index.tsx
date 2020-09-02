import React, { useState, FormEvent } from "react";

import { useGlobalState } from "../../../Context";
import { useBuyingFlowState } from "../Controller";

import Loading from "../../LoadingCircle";
import AlertNotification from "../../AlertNotification";

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
  ContinueButton,
} from "./styles";

import { DeliveryResponse } from "../../../Types/deliveryRelated_types";

const CepSearcher: React.FC = () => {
  const { next, DeliveryApi } = useBuyingFlowState();

  const {
    buyingController: { dispatch },
    cartManager: { cart },
  } = useGlobalState();
  const [cep, setCep] = useState("");
  const [lastCepSearched, setlastCepSearched] = useState("");
  const [shippmentMethods, setShippmentMethods] = useState<
    DeliveryResponse[] | undefined
  >(undefined);
  const [methodChoosed, setMethodChoosed] = useState<
    DeliveryResponse | undefined
  >(undefined);
  const [apiLoading, setApiLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  function handleCepUpdate(value: string) {
    let text = value.replace(/^(\d{5})(\d{1,3})/, "$1-$2");

    if (errorMessage) setErrorMessage(undefined);

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

    DeliveryApi.calcAndValidateDelivery(cep, qntdProducts, (err, data) => {
      if (err || !data) {
        setErrorMessage(err ? err.message : "Unexpected error");
      }
      setShippmentMethods(data);
      setApiLoading(false);
    });
  }

  async function handleCepChoosed() {
    if (!methodChoosed) return;

    const { Codigo, Metodo, PrazoEntrega, Valor } = methodChoosed;

    dispatch({
      type: "set-delivery",
      payload: {
        cep,
        Codigo,
        Metodo,
        PrazoEntrega,
        Valor,
      },
    });

    next();
  }

  return (
    <>
      <AlertNotification message={errorMessage} />
      <Container>
        <TitleDiv trigger={shippmentMethods ? true : false}>
          <h1>We're shipping to the wholly country.</h1>
        </TitleDiv>

        <Form onSubmit={handleFormSubmit}>
          <div>
            <Input
              type="text"
              placeholder="Postal code"
              pattern="(\d{5})(-{1})(\d{3})"
              maxLength={9}
              value={cep}
              onChange={(event) => handleCepUpdate(event.target.value)}
            />
          </div>
          <div>
            {apiLoading ? (
              <Loading color={"var(--primary)"} />
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
                  selected={
                    item.Codigo === methodChoosed?.Codigo ? true : false
                  }
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
              <ContinueButton onClick={handleCepChoosed}>
                Continue
              </ContinueButton>
            </Continue>
          </>
        )}
      </Container>
    </>
  );
};

export default CepSearcher;
