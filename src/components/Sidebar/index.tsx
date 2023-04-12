import React from "react";
import styled from "styled-components";

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
  const addElement = (): void => {
    console.log("Add Element");
  };

  return (
    <StyledSidebar>
      <button onClick={addElement}>Add</button>
    </StyledSidebar>
  );
};

export default Sidebar;
