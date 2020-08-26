import React, { useState, useEffect } from "react";
import { Formik, FormikHelpers } from "formik";

import api from "../../Services/api";
import { AddressSchema, postalCodeMask } from "../../Helpers/formRelated_helper";

import Input from "../Input";
import Select from "../Select";

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
}

const AddressForm: React.FC<Props> = ({
  initialState,
  submitHandler,
  action,
}) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState<undefined | string>(
    undefined
  );

  useEffect(() => {
    api
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const dataStates = response.data;
        const siglas = dataStates.map((state: StateOption) => state.sigla);
        setStates(siglas);
      });
  }, []);

  useEffect(() => {
    const initialValue = initialState ? initialState.state : "RO";

    api
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${
          selectedState || initialValue
        }/municipios`
      )
      .then((response) => {
        const dataCities = response.data;
        const citiesName = dataCities.map((city: CityOption) => city.nome);

        setCities(citiesName);
      });
  }, [selectedState, initialState]);

  return (
    <Formik
      initialValues={{
        state: "",
        city: "",
        neighborhood: "",
        street: "",
        number: "",
        postalCode: "",
        ...initialState,
      }}
      validationSchema={AddressSchema}
      onSubmit={submitHandler}
    >
      <Form>
        <TwoInputsDiv>
          <InputDiv>
            <Select
              name="state"
              Icon={StateIcon}
              stateWatcher={setSelectedState}
            >
              {states.map((sigla) => (
                <option key={sigla} value={sigla}>
                  {sigla}
                </option>
              ))}
            </Select>
          </InputDiv>
          <InputDiv>
            <Select name="city" Icon={CityIcon}>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </Select>
          </InputDiv>
        </TwoInputsDiv>

        <InputDiv>
          <Input
            type="text"
            placeholder="Neighborhood"
            name="neighborhood"
            Icon={NeighborhoodIcon}
          />
        </InputDiv>

        <InputDiv>
          <Input
            type="text"
            placeholder="Postal Code"
            name="postalCode"
            Icon={CepIcon}
            mask={postalCodeMask}
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
        <Button type="submit">{action}</Button>
      </Form>
    </Formik>
  );
};

export default AddressForm;
