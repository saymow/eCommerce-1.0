import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  display: grid;
  grid-template-areas:
    "el1 el1 el2 el2 el2"
    "el1 el1 el3 el3 el4"
    "el5 el5 el3 el3 el6";
  width: 100%;
  grid-gap: 2rem;

  @media (max-width: 980px) {
    grid-template-areas:
      "el1 el1 el2 el2 el2"
      "el1 el1 el2 el2 el2"
      "el5 el5 el3 el3 el3"
      "el5 el5 el3 el3 el3"
      "el4 el4 el6 el6 el6";

    grid-gap: 1.4rem;
  }

  @media (max-width: 640px) {
    grid-template-areas: "el1" "el3" "el4";
    grid-template-rows: repeat(3, 1fr);
    grid-gap: 4rem;
  }
`;

export const Section = styled.section`
  &.el1 {
    grid-area: el1;
  }
  &.el2 {
    background-color: var(--brand);
    grid-area: el2;
  }
  &.el3 {
    grid-area: el3;
  }
  &.el4 {
    grid-area: el4;
  }
  &.el5 {
    grid-area: el5;
    background-color: var(--tertiary);
  }
  &.el6 {
    grid-area: el6;
    background-color: var(--secondary);
  }

  &.hasImage {
    display: grid;
    grid-template-columns: 2fr 3fr;

    div > img {
      object-fit: cover;
      display: block;
      height: 100%;
      width: 100%;
    }
  }

  @media (max-width: 640px) {
    &:not(.hasText) {
      display: none;
    }
  }

  min-height: 120px;
  box-shadow: 3px 3px 10px var(--primary);

  div h3 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary);
  }

  h3,
  p {
    word-wrap: break-word;
  }

  div p {
    font-size: 1.5rem;
    color: var(--secondary);
  }

  div:last-child {
    padding: 1.2rem;
  }
`;
