import styled from "styled-components";

import { ThreeBars, EmojiSad } from "styles/icons";
import { Button as DefaultButton } from "styles/utils";

export const Container = styled.div`
  display: grid;

  grid-template-rows: 6fr 1fr;
`;

export const AddressesContainer = styled.article`
  overflow: auto;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 13rem);

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }

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
  cursor: pointer;

  position: relative;

  p {
    font-size: 1.8rem;
    line-height: 2.6rem;

    span {
      font-weight: 500;
    }
  }

  &.selected {
    background: #e1faec;
    border: 1px solid #34cb79;
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

export const Button = styled(DefaultButton)`
  position: absolute;
  right: 0;
  bottom: 0;

  max-width: 22rem;
`;

export const CenteredContainer = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  margin: auto;

  max-width: 42rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2.8rem;
    text-align: center;
  }
`;

export const SadIcon = styled(EmojiSad)`
  height: 9rem;
  width: 9rem;

  fill: var(--brand);

  margin: 2rem 0;
`;
