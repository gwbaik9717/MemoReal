import React from "react";
import styled from "styled-components";
import Panel from "../Panel";

const StyledPage = styled.div`
  background-color: yellow;
  width: 1120px;
  height: 600px;
`;

const Page: React.FC = () => {
  return (
    <StyledPage>
      <Panel>content</Panel>
      <Panel>content</Panel>
    </StyledPage>
  );
};

export default Page;
