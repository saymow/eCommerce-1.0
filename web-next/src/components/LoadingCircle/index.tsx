import React from "react";

import { Container } from "./styles";

export interface Props {
  size?: number;
  color?: string;
}

const LoadingCircle: React.FC<Props> = ({ size, color }) => {
  return <Container color={color} size={size} />;
};

export default LoadingCircle;
