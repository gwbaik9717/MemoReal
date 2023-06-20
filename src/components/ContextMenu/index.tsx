import React from "react";
import styled, { css } from "styled-components";

const StyledContextMenu = styled.div`
  position: absolute;
  width: 200px;
  background-color: #383838;
  border-radius: 5px;
  box-sizing: border-box;
  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 10px;
    margin: 0;
    list-style: none;
  }
  ul li {
    padding: 18px 12px;
  }
  /* hover */
  ul li:hover {
    cursor: pointer;
    background-color: #000000;
  }
`;

interface Props {
  top: number;
  left: number;
}

const ContextMenu = ({ top, left }: Props) => {
  return <StyledContextMenu top={top} left={left}></StyledContextMenu>;
};
export default ContextMenu;
