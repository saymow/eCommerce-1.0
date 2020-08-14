import styled from "styled-components";

import { ArrowIosForwardOutline, UserAlt, Camera } from "../../../Styles/icons";

interface ListItemProps {
  selected?: Boolean;
}

export const Container = styled.section`
  display: flex;
  flex-direction: column;

  border-radius: 0.5rem;

  box-shadow: var(--box-shadow);
`;

export const Profile = styled.div`
  padding: 1.2rem;
`;

export const Avatar = styled.div`
  position: relative;

  height: max(13vw, 89px);
  width: max(13vw, 89px);
  border-radius: 50%;

  margin: auto;

  background-color: #bbb;

  &:hover > div {
    display: block;
  }
`;

export const AvatarIcon = styled(UserAlt)`
  width: max(8.75vw, 60px);
  height: max(8.75vw, 60px);

  position: absolute;
  top: 50%;
  left: 50%;

  color: var(--shadow-lv2);

  transform: translate(-50%, -50%);
`;

export const BackDrop = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: none;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
`;

export const UploadIcon = styled(Camera)`
  height: 30%;
  width: 30%;

  color: var(--background);

  z-index: 2;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Description = styled.div`
  padding-top: 1.5rem;
  font-size: 1.6rem;
`;

export const ItemList = styled.ul`
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const ListItem = styled.li<ListItemProps>`
  list-style: none;
  cursor: pointer;

  padding: 1rem;
  border: 1px solid var(--shadow-lv2);
  border-top: none;

  display: flex;
  align-items: center;
  justify-content: space-between;

  transition: all 200ms eaase;

  &:hover {
    p {
      color: var(--brand);
    }
    svg {
      color: var(--brand);
    }
  }

  p {
    transition: color 200ms ease;
    font-size: 1.6rem;
    color: ${(props) => (props.selected ? "var(--brand)" : "inherit")};
    font-weight: ${(props) => (props.selected ? "bold" : "inherit")};
  }

  svg {
    color: ${(props) => (props.selected ? "var(--brand)" : "inherit")};
    transform: rotate(${(props) => (props.selected ? "180deg" : "0")});
  }
`;

export const ForwardIcon = styled(ArrowIosForwardOutline)<ListItemProps>`
  width: 2.5rem;
  height: 2.5rem;

  transition: all 200ms ease;
`;
