import styled, { css } from "styled-components";
import { Form as formikForm } from "formik";

import { Button as DefaultButton } from "../../../Styles/utils";

import {
  City,
  Streetview,
  Home,
  BuildingHouse,
  Location,
} from "../../../Styles/icons";

export const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled(formikForm)`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const InputDiv = styled.div`
  margin: 1rem 0;
`;

export const TwoInputsDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr;
  grid-gap: 1rem;

  &.inversed {
    grid-template-columns: 4fr 2fr !important;
  }
`;

export const Button = styled(DefaultButton)`
  position: absolute;
  bottom: 15px;
  right: 15px;
  width: 40%;
`;

const IconsCSS = css`
  position: absolute;
  display: block;
  border-right: 2px solid var(--primary);
  width: 4.2rem;
  height: 4.2rem;
`;

export const neighborhoodIcon = styled(BuildingHouse)`
  ${IconsCSS}
`;

export const streetIcon = styled(Streetview)`
  ${IconsCSS}
`;

export const houseNumberIcon = styled(Home)`
  ${IconsCSS}
`;

export const CityIcon = styled(City)`
  ${IconsCSS}
`;

export const StateIcon = styled(Location)`
  ${IconsCSS}
`;
