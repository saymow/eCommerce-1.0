import styled from "styled-components";

import { DrawerHandler } from "styles/utils";

export const Container = styled.section`
  width: 90%;
  margin: auto;
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

export const Drawer = styled(DrawerHandler)``;

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
