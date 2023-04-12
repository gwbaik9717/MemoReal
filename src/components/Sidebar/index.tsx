import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/modules";
import { addElement as addPageElement } from "../../store/modules/page";

const StyledSidebar = styled.div`
  background-color: gray;
  width: 50px;

  button {
    width: 100%;
    background-color: black;
    color: #fff;
  }
`;

const Sidebar: React.FC = () => {
  const page = useSelector((state: RootState) => state.page);

  const dispatch = useDispatch();

  const addElement = () => {
    dispatch(addPageElement());
  };

  return (
    <StyledSidebar>
      <button onClick={addElement}>Add</button>
    </StyledSidebar>
  );
};

export default Sidebar;
