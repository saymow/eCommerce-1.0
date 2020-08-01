import styled from "styled-components";

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
  box-shadow: 3px 3px 10px var(--shadow-lv2);
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
  display: flex;
  align-items: center;

  select {
    text-align: center;
    font-size: 2rem;
    padding: 0.3rem;
    color: var(--primary);
    margin-right: 0.5rem;
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
  width: 200px;
  background-color: var(--primary);
  color: #fff;
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  font-weight: bold;
  padding: 1rem;

  transition: all 200ms ease;

  &:hover {
    background-color: transparent;
    color: var(--primary);
  }
`;
