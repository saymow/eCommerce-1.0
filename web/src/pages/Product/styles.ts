import styled from "styled-components";

import { Button as DefaultButton } from "../../Styles/utils";

interface FigureParams {
  image: string;
  position: string;
}

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductContainer = styled.div`
  background-color: var(--shadow-lv1);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: var(--box-shadow);
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  transition: 300ms ease;

  &:hover {
    background-color: var(--shadow-lv2);
    box-shadow: 3px 3px 10px var(--shadow-lv2);
  }
`;

export const ImageFigure = styled.figure.attrs(
  ({ image, position }: FigureParams) => ({
    style: {
      backgroundImage: `url(${image})`,
      backgroundPosition: position,
    },
  })
)<FigureParams>`
  cursor: move;
  width: 100%;

  > img {
    display: block;
    width: 100%;
  }

  &:hover img {
    opacity: 0;
  }
`;

export const ProductInfo = styled.div`
  padding-left: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  > div,
  h1 {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  > div,
  p {
    font-size: 1.6rem;
  }
`;

export const ProductInputs = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;

  strong {
    font-size: 4.2rem;
  }

  span {
    font-size: 1rem;
    color: var(--brand);
    position: absolute;
    right: 0;
    top: 0;
  }

  div {
    display: flex;
    align-items: flex-end;

    p {
      text-transform: uppercase;
      font-size: 1.4rem;
      margin-right: 0.4rem;
      font-weight: bold;
    }

    select {
      text-align: center;
      font-size: 2rem;
      padding: 0.3rem;
      color: var(--primary);
      margin-right: 0.5rem;
    }
    margin-left: auto;
  }
`;

export const Button = styled(DefaultButton)`
  background: var(--primary);
  margin-left: 1.2rem;
  min-width: 12rem;
`;
