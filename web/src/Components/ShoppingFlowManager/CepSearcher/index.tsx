import React, { useState, FormEvent, useCallback } from "react";

import { useGlobalState, useNotificationContext } from "../../../Context";
import { useBuyingFlowState } from "../Controller";

import Loading from "../../LoadingCircle";

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

import { Delivery, DeliveryType } from "../../../Types/buyingFlowRelated_types";

interface ShippingMethods {
  type: DeliveryType;
  deadline: string;
  price: string;
}

const randomInt = (min: number, max: number) => {
  return min + Math.round(Math.random() * (max - min));
};

const makeShippinMethods = (): ShippingMethods[] => {
  return [
    {
      type: DeliveryType.Standard,
      deadline: randomInt(3, 7).toString(),
      price: "15.00",
    },
    {
      type: DeliveryType.Express,
      deadline: randomInt(7, 12).toString(),
      price: "20.00",
    },
  ];
};

const CepSearcher: React.FC = () => {
  const { next } = useBuyingFlowState();
  const {
    buyingController: { dispatch },
    cartManager: { cart },
  } = useGlobalState();

  const [postalCode, setPostalCode] = useState("");
  const [lastPostalCode, setLastPostalCode] = useState("");
  const [shippmentMethods, setShippmentMethods] = useState<
    ShippingMethods[] | undefined
  >(undefined);
  const [methodChoosed, setMethodChoosed] = useState<
    ShippingMethods | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);

  function handleCepUpdate(value: string) {
    let text = value.replace(/^(\d{5})(\d{1,3})/, "$1-$2");

    setPostalCode(text);
  }

  function handleFormSubmit(event: FormEvent) {
    event.preventDefault();
    handleApiSearch();
  }

  const handleApiSearch = useCallback(() => {
    if (postalCode === lastPostalCode) return;

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      setShippmentMethods(makeShippinMethods());
      setLastPostalCode(postalCode);
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lastPostalCode, postalCode]);

  async function handleCepChoosed() {
    if (!methodChoosed) return;

    dispatch({
      type: "set-delivery",
      payload: {
        code: postalCode,
        ...methodChoosed,
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
            placeholder="Postal code"
            pattern="(\d{5})(-{1})(\d{3})"
            maxLength={9}
            value={postalCode}
            onChange={(event) => handleCepUpdate(event.target.value)}
          />
        </div>
        <div>
          {isLoading ? (
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
                key={item.type}
                onClick={() => setMethodChoosed(item)}
                selected={item.type === methodChoosed?.type ? true : false}
              >
                <ShippingIcon />
                <h3>{item.type}</h3>
                <strong>R${item.price.replace(".", ",")}</strong>
                <p>
                  Deadline: <strong>{item.deadline}</strong> Working days.
                </p>
              </ShippingSelf>
            ))}
          </Shipping>
          <Continue trigger={methodChoosed ? true : false}>
            <ContinueButton onClick={handleCepChoosed}>Continue</ContinueButton>
          </Continue>
        </>
      )}
    </Container>
  );
};

export default CepSearcher;
