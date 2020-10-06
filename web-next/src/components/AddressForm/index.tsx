import React, { useState } from "react";
import { Formik, FormikHelpers } from "formik";
import { ValidationError } from "yup";

import DeliveryManager from "helpers/deliveryRelated_helper";
import {
  AddressSchema,
  postalCodeMask,
} from "../../helpers/formRelated_helper";

import Input from "../Input";

import {
  Form,
  StateIcon,
  CityIcon,
  NeighborhoodIcon,
  StreetIcon,
  CepIcon,
  HouseNumberIcon,
  TwoInputsDiv,
  InputDiv,
  Button,
} from "./styles";

interface StateOption {
  sigla: string;
}

interface CityOption {
  nome: string;
}

interface InitialState {
  id?: number;
  state?: string;
  city?: string;
  neighborhood?: string;
  street?: string;
  number?: string;
}

interface FormProps {
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  postalCode: string;
}

interface Props {
  initialState?: InitialState;
  action: string;
  submitHandler(
    values: FormProps,
    formik: FormikHelpers<FormProps>
  ): Promise<void>;
  disableDefaultButton?: boolean;
}

const AddressForm: React.FC<Props> = ({
  initialState,
  submitHandler,
  action,
  disableDefaultButton,
}) => {
  const [postalCodeIsInvalid, setPostalCodeIsInvalid] = useState<
    string | undefined
  >(undefined);

  const deliveryApi = new DeliveryManager();

  return (
    <Formik
      key={"test"}
      initialValues={{
        state: "",
        city: "",
        neighborhood: "",
        postalCode: "",
        street: "",
        number: "",
        ...initialState,
      }}
      validate={async (data: any) => {
        try {
          // When the postalCode is not find on correios api i set an error, altought the field manage to pass
          // yup validation, so, by doing this i can bypass yup validation and keep that error, considering that
          // the postalCode MUST be valid and the whole form hinges upon it, the approach isn't that bad.
          if (postalCodeIsInvalid) {
            return { postalCode: postalCodeIsInvalid };
          } else
            await AddressSchema.validate(data, {
              abortEarly: false,
            });
        } catch (error) {
          if (error instanceof ValidationError) {
            let errors: {
              [key: string]: string;
            } = {};

            error.inner.forEach((error) => {
              errors[error.path as string] = error.message;
            });

            return errors;
          }
        }
      }}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <Form id={disableDefaultButton ? "AddressForm" : ""}>
          <InputDiv>
            <Input
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              Icon={CepIcon}
              mask={postalCodeMask}
              onBlur={async function handleFetchDataByPostalCode(
                e: React.FocusEvent<HTMLInputElement>,
                hasError
              ) {
                if (hasError && hasError !== "Invalid postal code.") return;

                const postalCode = e.target.value;

                deliveryApi
                  .searchLocationByCep(postalCode)
                  .then(async (data) => {
                    setPostalCodeIsInvalid(undefined);

                    for (let [key, value] of Object.entries(data)) {
                      formik.setFieldValue(key, value);
                    }
                  })
                  .catch(({ message = "Invalid postal code" }: Error) => {
                    setPostalCodeIsInvalid(message);
                    formik.setFieldError("postalCode", message);
                    // shouldValidate did'nt worked
                    // formik.setFieldValue("postalCode", postalCode, false);
                  });
              }}
            />
          </InputDiv>

          <TwoInputsDiv>
            <InputDiv>
              <Input disabled name="state" Icon={StateIcon}></Input>
            </InputDiv>
            <InputDiv>
              <Input disabled name="city" Icon={CityIcon} />
            </InputDiv>
          </TwoInputsDiv>

          <InputDiv>
            <Input
              disabled
              type="text"
              placeholder="Neighborhood"
              name="neighborhood"
              Icon={NeighborhoodIcon}
            />
          </InputDiv>

          <TwoInputsDiv className="inversed">
            <InputDiv>
              <Input
                type="text"
                placeholder="Street"
                name="street"
                Icon={StreetIcon}
              />
            </InputDiv>
            <InputDiv>
              <Input
                type="number"
                placeholder="House number"
                name="number"
                max={9999}
                Icon={HouseNumberIcon}
              />
            </InputDiv>
          </TwoInputsDiv>
          {!disableDefaultButton && <Button type="submit">{action}</Button>}
        </Form>
      )}
    </Formik>
  );
};

export default AddressForm;
