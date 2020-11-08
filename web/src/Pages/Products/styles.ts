import styled from "styled-components";

import { EmojiSad } from "../../Styles/icons";

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
  max-width: 1080px;
`;

export const FiltersWrapper = styled.header`
  width: 100%;
  max-width: 1080px;
  margin: 2rem 0;
  padding: 0 2rem;

  > div {
    float: right;

    display: flex;
    align-items: center;

    padding: 0.5rem;

    > div:first-child {
      display: flex;
      align-items: center;

      strong {
        font-size: 1.2rem;
        text-transform: uppercase;
      }

      select {
        margin-left: 0.5rem;
        font-size: 1.4rem;
        padding: 0.3rem;
      }
    }

    @media (max-width: 500px) {
      > div {
        strong {
          text-align: right;
        }

        select {
          margin-left: 0.2rem;
          width: 60%;
        }
      }

      input {
        margin-left: 1rem;
        width: 65%;
      }
    }
  }
`;

export const SearcherInput = styled.input`
  margin-left: 1.8rem;

  font-size: 2.2rem;
  background: var(--background-secondary);
  padding: 1rem;
  border-radius: 0.5rem;
`;

export const NoQueryMatches = styled.div`
  padding-top: 8rem;

  width: 60%;
  max-width: 50rem;

  margin: auto;

  h1 {
    font-size: 3rem;
    text-align: center;
  }
`;

export const SadIcon = styled(EmojiSad)`
  display: block;
  width: 9rem;
  height: 9rem;

  margin: 2rem auto;

  fill: var(--brand);
`;

export const ProductList = styled.section`
  width: 100%;

  padding: 0 2rem;

  display: flex;
  flex-wrap: wrap;
`;

export const ProductSelf = styled.div`
  flex-grow: 0;
  margin: 3%;
  flex-basis: 27.33%;

  padding: 0.6rem;
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
  background: var(--background-primary);

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
    top: -1.2rem;
    right: -1.2rem;

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
