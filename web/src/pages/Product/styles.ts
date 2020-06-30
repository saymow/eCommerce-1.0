import styled from "styled-components";

import { Transitions } from "../../styles/globalStyles";

interface FigureParams {
  image: string;
  position: string;
}

export const Container = styled(Transitions)`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductContainer = styled.div`
  background-color: rgba(245, 245, 245);
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 3px 3px 10px rgba(240, 240, 240);
  width: 100%;
  max-width: 960px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  transition: 200ms ease;

  &:hover {
    background-color: rgba(235, 235, 235);
    box-shadow: 3px 3px 10px #ddd;
  }
`;

export const ImageFigure = styled.figure<FigureParams>`
  cursor: move;
  width: 100%;

  background-image: url(${(props) => props.image});
  background-position: ${(props) => props.position};

  > img {
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
  display: flex;
  align-items: center;

  select {
    text-align: center;
    font-size: 2rem;
    padding: .3rem;
    color: var(--primary);
    margin-right: .5rem;
  }

  span {
    font-size: 1rem;
    position: absolute;
    right: 0;
    bottom: 0;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  background-color: var(--primary);
  color: #fff;
  padding: 1rem;
  width: 200px;

  &:hover {
    filter: brightness(80%);
  }
`;
