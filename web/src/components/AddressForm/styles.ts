import styled, { css } from "styled-components";
import { Form as formikForm } from "formik";

import { Button as DefaultButton } from "../../Styles/utils";

import {
  City,
  Streetview,
  Home,
  BuildingHouse,
  Location,
  Detail,
} from "../../Styles/icons";

export const Form = styled(formikForm)`
  max-width: 60rem;
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
  bottom: 3.5rem;
  right: 1.5rem;
  width: 40%;
`;

const IconsCSS = css`
  position: absolute;
  display: block;
  border-right: 2px solid var(--shadow-lv1);
  width: 4.2rem;
  height: 4.2rem;
`;

export const NeighborhoodIcon = styled(BuildingHouse)`
  ${IconsCSS}
`;

export const StreetIcon = styled(Streetview)`
  ${IconsCSS}
`;

export const HouseNumberIcon = styled(Home)`
  ${IconsCSS}
`;

export const CityIcon = styled(City)`
  ${IconsCSS}
`;

export const StateIcon = styled(Location)`
  ${IconsCSS}
`;

export const CepIcon = styled(Detail)`
  ${IconsCSS}
`;
