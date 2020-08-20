import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem 0;
  height: 100%;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }
`;

export const ItemList = styled.ul`
  padding-top: 2rem;

  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.li`
  position: relative;

  padding-bottom: 1.6rem;
  margin: 2.2rem 1.6rem;

  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  align-items: flex-start;

  border: 1px solid var(--shadow-lv2);
  border-radius: 0 0.5rem 0 0.5rem;

  section:first-child h2 {
    position: absolute;
    top: -2.4rem;
    left: -0.8rem;

    background: var(--background-secondary);
    padding: 0 2rem;

    font-size: 2.6rem;

    &:before {
      content: "";
      display: block;
      position: absolute;
      left: 1.2rem;
      top: -0.2rem;

      width: 3rem;
      height: 0.6rem;
      border-radius: 0.5rem;
      background: var(--brand);
    }
  }

  section {
    padding: 1rem;
    p {
      font-size: 1.2;
      line-height: 1.8rem;

      span {
        font-weight: bold;
      }
    }
  }
`;

export const MainInfo = styled.section`
  margin-top: 1rem;
`;

export const AddressInfo = styled.section`
  h3 {
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
  }
`;

export const ProductList = styled.ul`
  height: 80%;
  margin: 1rem;

  display: flex;
  align-items: flex-start;

  border: 1px solid var(--shadow-lv1);

  overflow-y: hidden;
  overflow-x: auto;
  ::-webkit-scrollbar {
    height: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--primary);
    border-radius: 4px;
  }
`;

export const Product = styled.li`
  flex: 0 0 calc(24% - 2 * 0.5rem);
  margin: 0.5rem 2%;

  display: flex;

  flex-direction: column;

  div {
    img {
      max-width: 100%;
      object-fit: cover;
    }

    p {
      font-size: 1rem;

      span {
        font-weight: bold;
      }
    }
  }
`;

export const TotalPrice = styled.p`
  position: absolute;
  bottom: -1rem;
  right: -1rem;

  font-size: 2rem;

  background: var(--background-secondary);
  padding: 0 2rem;

  &:after {
    content: "";
    position: absolute;
    display: block;
    right: 1rem;
    margin-top: 0.5rem;

    width: 6rem;
    height: 0.6rem;
    background: var(--brand);
    border-radius: 0.5rem;
  }
`;
