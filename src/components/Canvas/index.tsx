import React from "react";
import styled from "styled-components";
import Panel from "../Panel";

const StyledCanvas = styled.div`
  background-color: yellow;
  width: 1120px;
  height: 600px;
`;

const Canvas: React.FC = () => {
  return (
    <StyledCanvas>
      <Panel>content</Panel>
    </StyledCanvas>
  );
};

export default Canvas;
