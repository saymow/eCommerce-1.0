import styled from "styled-components";

import { LibraryAdd } from "../../../Styles/icons";

export const Container = styled.div`
  height: 100%;
  padding: 1rem 0 2rem 0;
`;

export const AddressesContainer = styled.article`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 13rem);

  section {
    margin: 1rem;
    padding: 0.5rem;

    background: var(--background-secondary);
    border: 1px solid var(--shadow-lv2);
    border-radius: 0.5rem;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Address = styled.section`
  p {
    font-size: 1.8rem;
    line-height: 2.6rem;

    span {
      font-weight: 500;
    }
  }
`;

export const AddAddress = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    width: 10rem;
    height: 10rem;
    padding: 1rem;
    background: var(--shadow-lv1);
    border-radius: 50%;
  }
`;

export const Message = styled.div`
  margin: 4rem auto;
  text-align: center;
  font-size: 1.8rem;
`;
export const ButtonAdd = styled(LibraryAdd)`
  margin: 1.6rem 0;

  width: 5rem;
  height: 5rem;

  fill: var(--brand);
`;
