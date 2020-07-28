import styled, { keyframes } from "styled-components";

import { Props } from "./index";

const Rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg)
  }
`;

export const Container = styled.div.attrs(({ color, size }: Props) => ({
  style: {
    width: `${size ? size : 50}px`,
    height: size ? size : 50,
    border: `${size ? size * (16 / 100) : 8}px solid ${
      color ? color : "#151615"
    }`,
    borderBottom: "8px solid transparent",
  },
}))<Props>`
  border-radius: 50%;

  animation: ${Rotate} 1s linear infinite;
`;
