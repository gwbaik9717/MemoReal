import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/config";
import { addElement as addPageElement } from "../../store/slices/pageSlice";
import { v4 as uuid } from "uuid";

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
  const dispatch = useAppDispatch();

  const addElement = () => {
    dispatch(
      addPageElement({
        id: uuid()
      })
    );
  };

  return (
    <StyledSidebar>
      <button onClick={addElement}>Add</button>
    </StyledSidebar>
  );
};

export default Sidebar;
