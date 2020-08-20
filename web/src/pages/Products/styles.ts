import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  min-height: 100vh;
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export const ProductsWrapper = styled.div`
  margin: 10rem auto;
  width: 100%;
`;

export const ProductList = styled.section`
  margin: auto;
  width: 100%;
  max-width: 1080px;
  padding: 0 2rem;

  display: flex;
  flex-wrap: wrap;
`;

export const ProductSelf = styled.div`
  flex-grow: 1;
  margin: 3%;
  flex-basis: 27.33%;

  padding: 1rem;
  border: 1px solid var(--shadow-lv2);

  @media (max-width: 780px) {
    &:first-child {
      flex: 1 88%;
    }

    &:not(:first-child) {
      flex: 1 44%;
    }
  }

  @media (max-width: 540px) {
    flex: 1 88% !important;
  }

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  color: var(--primary);
  background: var(--background-secondary);

  transition: all 300ms ease;

  cursor: context-menu;

  img {
    cursor: pointer;
    width: 100%;
  }

  strong {
    margin-right: auto;
    font-weight: 400;
    font-size: 1.4rem;
    cursor: pointer;
    line-height: 5rem;
  }

  span {
    position: absolute;
    top: -1.6rem;
    right: -1.6rem;

    font-size: 1.8rem;
    padding: 0.5rem;

    color: #fff;
    background: var(--primary);
    transform: rotate(5deg);
  }
`;

export const Options = styled.div`
  width: 80%;
  margin: 2rem 0 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-content: center;

  a {
    text-align: center;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  a,
  button {
    text-transform: uppercase;
    font-size: 1.1rem;
    color: var(--primary);
  }

  button {
    cursor: pointer;
    padding: 0.8rem 1.2rem;
    color: var(--background-primary);
    background: var(--primary);
  }
`;
