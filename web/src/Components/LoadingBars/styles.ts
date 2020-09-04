import styled from "styled-components";

interface LoadingComponentProps {
  barIndex: number;
  width?: string;
  height?: string;
}

interface BarProps {
  color?: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    margin-bottom: 15%;
  }
`;

export const LoadingComponent = styled.div.attrs(
  ({ height, width }: LoadingComponentProps) => ({
    style: {
      width: `${width ? width : "10%"}`,
      height: `${height ? height : "10%"}`,
    },
  })
)<LoadingComponentProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div:nth-child(${(props) => props.barIndex}) {
    height: 100%;
  }
`;

export const Bar = styled.div.attrs(({ color }: BarProps) => ({
  style: {
    background: `${color ? color : "linear-gradient(90deg, #ddd, #eee)"}`,
  },
}))`
  height: 30%;
  width: 13%;

  transition: 200ms ease;
`;
