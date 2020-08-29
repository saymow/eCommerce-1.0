import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  font-size: 2rem;
  width: 100%;
  background: var(--brand);
  border: 1px solid var(--primary);
  color: var(--background-primary);
  padding: 1rem;
  border-radius: 0.5rem;

  transition: 200ms ease;
  transition-property: background, color;

  &:hover {
    background-color: transparent;
    color: var(--primary);
  }
`;

const DrawerHandler = styled.div`
  cursor: pointer;
  position: absolute;
  right: -2.6rem;
  top: 50%;

  width: 2.6rem;
  height: 3rem;
  border-radius: 0 0.5rem 0.5rem 0;

  background: var(--background-secondary);

  display: none;
  justify-content: center;
  align-items: center;

  div {
    height: 70%;
    width: 75%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    div {
      width: 100%;
      height: 0.1rem;
      background: var(--brand);
    }
  }

  @media (max-width: 920px) {
    display: flex;
  }
`;

export { Button, DrawerHandler };
