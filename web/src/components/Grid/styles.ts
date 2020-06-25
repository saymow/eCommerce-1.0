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
  border-radius: 1rem;
`;

export const Section = styled.section`
  &.el1 {grid-area: el1};
  &.el2 {
    background-color: var(--brand);
    grid-area: el2
  };
  &.el3 {grid-area: el3};
  &.el4 {grid-area: el4};
  &.el5 {
    grid-area: el5;
    background-color: var(--tertiary);
  };
  &.el6 {
    grid-area: el6;
    background-color: var(--secondary);
  };

  &.hasImage {
    display: grid;
    grid-template-columns: 2fr 3fr;

    div > img {
      height: 100%;
      width: 100%;
    }
  }

   
  min-height: 120px;
  box-shadow: 3px 3px 5px var(--primary);


  div h3 {
    font-size: 2.5rem;
    color: var(--primary);
  }
  
  div p {
    font-size: 1.5rem;
    color: var(--secondary);
  }

  div:last-child {
    padding: .5rem;
  }

`;
