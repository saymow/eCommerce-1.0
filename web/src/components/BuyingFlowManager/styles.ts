import styled from "styled-components";

interface ProgressMadeProps {
  position: number;
  stepsTotal: number;
}

interface StepProps extends ProgressMadeProps {
  reached: Boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ProgressMock = styled.div`
  width: 100%;
  height: 12%;
  padding: 0 5%;
  border-bottom: 1px solid var(--secondary);
`;

export const Progress = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  height: 0.5rem;
  background-color: rgba(0, 255, 0, 0.1);
`;

export const ProgressMade = styled.div.attrs(
  ({ position, stepsTotal }: ProgressMadeProps) => ({
    style: {
      width: `${position * (100 / stepsTotal)}%`,
    },
  })
)<ProgressMadeProps>`

  transition: width 200ms ease;
  height: 100%;
  background-color: #0f0;
`;

export const Step = styled.span.attrs(
  ({ position, stepsTotal }: StepProps) => ({
    style: {
      width: "60px",
      left: `calc(${(position + 1) * (100 / stepsTotal)}%)`,
    },
  })
)<StepProps>`
  position: absolute;
  transform: translateX(-30px);
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    margin-top: 3px;
    height: 10px;
    width: 10px;
    background-color: ${(props) =>
      props.reached ? "#0f0" : "rgba(0, 255, 0, .1)"};
    border-radius: 50%;
  }

  > p {
    margin-top: 3px;
    font-weight: ${(props) => (props.reached ? "600" : "400")};
    text-align: center;
  }
`;
