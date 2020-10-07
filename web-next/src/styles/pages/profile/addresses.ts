import styled from "styled-components";

import { LibraryAdd, ThreeBars } from "../../icons";

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
  position: relative;

  p {
    font-size: 1.8rem;
    line-height: 2.6rem;

    span {
      font-weight: 500;
    }
  }
`;

export const OptionsDropdown = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;

  &:hover ul {
    display: flex;
  }

  ul {
    display: none;
    flex-direction: column;
    align-items: center;

    list-style: none;

    border: 1px solid var(--shadow-lv2);
    background: var(--background-primary);

    width: 10rem;

    li {
      cursor: pointer;

      width: 100%;
      padding: 0.3rem;
      text-align: left;
      border-top: 1px solid var(--shadow-lv2);
      color: var(--secondary);
      font-size: 1.2rem;
    }
  }
`;

export const OptionsIcon = styled(ThreeBars)`
  display: block;
  margin-left: auto;
  cursor: pointer;

  fill: var(--brand);

  width: 2rem;
  height: 2rem;
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
  font-size: 1.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    cursor: pointer;
    width: 12rem;
    height: 12rem;

    margin: 2rem 0;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 50%;
    background: var(--shadow-lv1);
  }
`;

export const ButtonAdd = styled(LibraryAdd)`
  margin: 1.6rem 0;

  width: 5rem;
  height: 5rem;

  fill: var(--brand);
`;
