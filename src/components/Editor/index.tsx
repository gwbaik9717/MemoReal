import React from "react";
import Canvas from "../Page";
import Sidebar from "../Sidebar";
import styled from "styled-components";

const StyledEditor = styled.div`
  display: flex;
`;

const Editor: React.FC = () => {
  return (
    <StyledEditor>
      <Canvas />
      <Sidebar />
    </StyledEditor>
  );
};

export default Editor;
