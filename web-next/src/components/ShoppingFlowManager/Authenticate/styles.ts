import styled from "styled-components";

export const Container = styled.div`
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  display: grid;
  grid-template-rows: 3fr 2fr;

  > h2 {
    font-size: 2.5rem;
    padding: 0 2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > button:first-child {
      margin-bottom: 1.5rem;
    }
  }
`;

export const Button = styled.button`
  cursor: pointer;
  width: 80%;

  font-size: 2.5rem;
  padding: 1rem;

  color: #fff;
  background-color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 0.5rem;

  transition: all 200ms ease;

  &:hover {
    color: var(--primary);
    background-color: transparent;
  }
`;