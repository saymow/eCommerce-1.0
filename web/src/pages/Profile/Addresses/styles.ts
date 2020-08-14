import styled from "styled-components";

import { Plus } from "../../../Styles/icons";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(auto-fill, 13rem);

  box-shadow: var(--box-shadow);

  section {
    border: 1px solid var(--shadow-lv2);
    padding: 0.5rem;

    margin: 0 1rem 1rem 1rem;

    &:nth-child(2) + & {
      margin-top: 1rem;
    }
  }
`;

export const Address = styled.section`
  p {
    font-size: 1.8rem;
    line-height: 2.6rem;
  }
`;

export const AddAddress = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    padding: 1rem;
    background: var(--shadow-lv1);
    border-radius: 50%;
  }
`;

export const PlusIcon = styled(Plus)`
  width: 6rem;
  height: 6rem;

  fill: var(--brand);
`;
