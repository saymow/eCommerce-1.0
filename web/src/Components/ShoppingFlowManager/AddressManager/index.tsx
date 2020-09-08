import React, { useState } from "react";

import { useGlobalState, useNotificationContext } from "Context";
import { useBuyingFlowState } from "../Controller";

import {
  Container,
  UpperComponent,
  Button,
  LowerComponent,
  BringDownElement,
  BringDownIcon,
} from "./styles";

import CreateAdressForm from "./CreateAddressForm";
import ExistingAddresses from "./ExistingAddresses";

const AddressManager: React.FC = () => {
  const {
    buyingController: { deliveryMethod, dispatch },
    cartManager: { cart },
  } = useGlobalState();
  const { pushNotification } = useNotificationContext();
  const { DeliveryApi } = useBuyingFlowState();
  const [dragUpperComponent, toggleDragUpperComponent] = useState(true);

  async function updateShippmentCostsWheenNeeded(postalCode: string) {
    const currentPostalCode = deliveryMethod?.cep as string;

    if (postalCode === currentPostalCode) return;

    const data = await DeliveryApi.calcDelivery(postalCode, cart.length);

    if (!deliveryMethod)
      throw new Error("Shopping flow has failed, try once again later");

    const selectedService = data.find(
      (service) => service.Metodo === (deliveryMethod.type as string)
    );

    if (!selectedService)
      throw new Error("Shopping flow has failed, try once again later");

    const { Codigo, Metodo, PrazoEntrega, Valor } = selectedService;

    dispatch({
      type: "update-delivery",
      payload: {
        Codigo,
        Metodo,
        PrazoEntrega,
        Valor,
        cep: postalCode,
      },
    });

    pushNotification({
      type: "success",
      message: "Shippment costs updated successfuly.",
    });
  }

  return (
    <Container>
      <UpperComponent className={dragUpperComponent ? "draggedDown" : ""}>
        <CreateAdressForm
          updateShippmentCostsWheenNeeded={updateShippmentCostsWheenNeeded}
        />
        <Button
          type="submit"
          form="AddressForm"
          className={!dragUpperComponent ? "invisible" : ""}
        >
          Next
        </Button>
        <BringDownElement
          onClick={() => toggleDragUpperComponent((prev) => !prev)}
        >
          <p>
            {dragUpperComponent
              ? "Use an existing address"
              : "Register a new address"}
          </p>
          {"  "}
          <BringDownIcon className={dragUpperComponent ? "flipArrow" : ""} />
        </BringDownElement>
      </UpperComponent>
      <LowerComponent className={dragUpperComponent ? "hidden" : ""}>
        <ExistingAddresses
          updateShippmentCostsWheenNeeded={updateShippmentCostsWheenNeeded}
        />
      </LowerComponent>
    </Container>
  );
};

export default AddressManager;
