import styled from "styled-components";

interface ProgressMockProps {
  steps: string[];
  stepsLen: number;
}

interface StepProps {
  position: number;
  stepsTotal: number;
  reached: Boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ProgressMock = styled.div.attrs(
  ({ steps, stepsLen }: ProgressMockProps) => {
    return;
  }
)<ProgressMockProps>`
  width: 100%;
  height: 12%;
  padding: 0 5%;
  border-bottom: 1px solid var(--primary);
`;

export const Progress = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  height: 0.5rem;
  background-color: rgba(0, 255, 0, 0.1);
`;

export const ProgressMade = styled.div`
  height: 100%;
  width: 25%;
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
