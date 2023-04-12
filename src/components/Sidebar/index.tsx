import React from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { addElement as addPageElement } from "../../store/slices/pageSlice";

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
  const { elements } = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  const addElement = () => {
    dispatch(
      addPageElement({
        id: 2
      })
    );
    console.log(elements);
  };

  return (
    <StyledSidebar>
      <button onClick={addElement}>Add</button>
    </StyledSidebar>
  );
};

export default Sidebar;
