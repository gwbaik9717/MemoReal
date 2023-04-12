import React from "react";
import Page from "../Page";
import Sidebar from "../Sidebar";
import styled from "styled-components";

const StyledEditor = styled.div`
  display: flex;
`;

const Editor: React.FC = () => {
  return (
    <StyledEditor>
      <Page />
      <Sidebar />
    </StyledEditor>
  );
};

export default Editor;
