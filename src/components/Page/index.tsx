import React from "react";
import styled from "styled-components";
import Panel from "../Panel";
import { useAppSelector } from "../../store/config";

const StyledPage = styled.div`
  background-color: yellow;
  width: 1120px;
  height: 600px;
`;

const Page: React.FC = () => {
  const { elements } = useAppSelector((state) => state.page);

  return (
    <StyledPage>
      {elements.map((element) => (
        <Panel key={element.id}>content</Panel>
      ))}
    </StyledPage>
  );
};

export default Page;
