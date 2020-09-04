import styled from "styled-components";

import { ArrowIosDownwardOutline } from "../../../Styles/icons";
import { Button as DefaultButton } from "../../../Styles/utils";

export const Container = styled.div`
  position: relative;
  overflow: hidden;

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UpperComponent = styled.section`
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;

  background: var(--background-primary);

  transform: translateY(-100%) translateY(3rem);

  transition: transform 400ms ease;

  &.draggedDown {
    transform: translateY(0);
  }
`;

export const Button = styled(DefaultButton)`
  position: absolute;
  right: 0;
  bottom: 0;

  max-width: 22rem;

  transition: width 400ms ease, padding 400ms ease, border 400ms ease,
    background 200ms ease, color 200ms ease;

  &.invisible {
    width: 0;
    padding: 0;
    border: 0;
  }
`;

export const LowerComponent = styled.section`
  position: absolute;
  height: 100%;
  width: 100%;

  padding: 3rem 1rem;

  transition: visibility 500ms ease, opacity 400ms ease;

  &.hidden {
    visibility: hidden;
    opacity: 0;
  }
`;

export const BringDownElement = styled.div`
  cursor: pointer;
  height: 4rem;
  position: absolute;

  bottom: 0;
  left: 0;

  p {
    font-size: 2rem;
    color: var(--brand);
    font-weight: bold;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 520px) {
    max-width: 16rem;
    p {
      width: 8rem;
      text-align: center;
      font-size: 1rem;
    }
  }
`;

export const BringDownIcon = styled(ArrowIosDownwardOutline)`
  width: 4rem;
  height: 4rem;

  fill: var(--brand);

  transition: all 400ms ease;

  &.flipArrow {
    transform: rotate(180deg);
  }
`;
