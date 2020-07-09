import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  font-size: 2rem;
  width: 100%;
  background-color: var(--primary);
  border: 1px solid var(--primary);
  color: var(--background);
  padding: 1rem;
  border-radius: 0.5rem;

  transition: all 200ms ease;

  &:hover {
    background-color: transparent;
    color: var(--primary);
  }
`;

export { Button };
