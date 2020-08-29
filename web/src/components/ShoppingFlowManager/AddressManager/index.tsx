import React, { useState } from "react";

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
  const [dragUpperComponent, toggleDragUpperComponent] = useState(true);

  return (
    <Container>
      <UpperComponent className={dragUpperComponent ? "draggedDown" : ""}>
        <CreateAdressForm />
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
        <ExistingAddresses />
      </LowerComponent>
    </Container>
  );
};

export default AddressManager;
