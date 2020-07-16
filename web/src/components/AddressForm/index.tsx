import React, { useState, useEffect } from "react";
import { Formik } from "formik";

import { useBuyingFlowState } from "../BuyingFlowManager";
import { useGlobalState } from "../../Context";
import api from "../../Services/api";
import { AddressSchema } from "../../Helper/formRelated_helper";

import Input from "./../Input";
import Select from "./../Select";

import {
  Container,
  Form,
  StateIcon,
  CityIcon,
  neighborhoodIcon,
  streetIcon,
  houseNumberIcon,
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

const AddressForm: React.FC = () => {
  const {
    buyingController: { dispatch },
  } = useGlobalState();

  const { next } = useBuyingFlowState();

  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState<undefined | string>(
    undefined
  );
  const [cities, setCities] = useState([]);

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
    api
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${
          selectedState || "RO"
        }/municipios`
      )
      .then((response) => {
        const dataCities = response.data;
        const citiesName = dataCities.map((city: CityOption) => city.nome);

        setCities(citiesName);
      });
  }, [selectedState]);

  return (
    <Container>
      <Formik
        initialValues={{
          state: "",
          city: "",
          neighborhood: "",
          street: "",
          number: "",
        }}
        validationSchema={AddressSchema}
        onSubmit={(values) => {
          const { state, city, neighborhood, street, number } = values;

          dispatch({
            type: "set-address",
            payload: {
              state,
              city,
              neighborhood,
              street,
              number,
            },
          });

          next();
        }}
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
              Icon={neighborhoodIcon}
            />
          </InputDiv>
          <TwoInputsDiv className="inversed">
            <InputDiv>
              <Input
                type="text"
                placeholder="Street"
                name="street"
                Icon={streetIcon}
              />
            </InputDiv>
            <InputDiv>
              <Input
                type="number"
                placeholder="House number"
                name="number"
                max={9999}
                Icon={houseNumberIcon}
              />
            </InputDiv>
          </TwoInputsDiv>
          <Button type="submit">Next</Button>
        </Form>
      </Formik>
    </Container>
  );
};

export default AddressForm;
