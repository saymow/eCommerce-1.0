import React, { useEffect, useState } from "react";
// import LoadingComponent from "react-loading"

import { Container, LoadingComponent, Bar } from "./styles";

interface Props {
  barQntd?: number;
  color?: string;
  width?: string;
  height?: string;
  delay?: number;
}

const Loading: React.FC<Props> = ({ barQntd, color, width, height, delay }) => {
  const barsQntd = barQntd || 5;
  const BarsArray = Array(barsQntd).fill(0);
  let [currentBar, setCurrentBar] = useState(1);

  useEffect(() => {
    let interval = setInterval(() => {
      setCurrentBar((previous) => (previous === barsQntd ? 0 : previous + 1));
    }, delay || 200);
    return () => clearInterval(interval);
  }, [setCurrentBar, barsQntd, delay]);

  return (
    <Container>
      <LoadingComponent barIndex={currentBar} width={width} height={height}>
        {BarsArray.map((_, i) => (
          <Bar key={i} color={color} />
        ))}
      </LoadingComponent>
    </Container>
  );
};

export default Loading;
