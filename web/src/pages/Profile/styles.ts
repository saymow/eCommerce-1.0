import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 1360px;
  height: calc(100vh + 6rem);
`;

export const ProfileWrapper = styled.section`
  width: 90%;
  margin: 12rem auto;
  height: min(80vh, 510px);
  padding: 1rem;

  border-radius: 0.5rem;

  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 1rem;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const RouteNavigatorWrapper = styled.div`
  @media (max-width: 920px) {
    position: fixed;
    top: 6rem;
    left: 0;
    bottom: 0;

    width: max(calc(90% / 4), 18rem);

    transform: translateX(-100%);
    z-index: 2;

    transition: transform 200ms ease;

    &.opened {
      transform: translateX(0%);
    }
  }
`;

export const Drawer = styled.div`
  cursor: pointer;
  position: absolute;
  right: -2.6rem;
  top: 50%;
  z-index: 3rem;


  width: 2.6rem;
  height: 3rem;
  border-radius: 0 0.5rem 0.5rem 0;

  background: var(--background-secondary);

  display: block;
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

export const ContentWrapper = styled.div`
  box-shadow: var(--box-shadow);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }
`;
