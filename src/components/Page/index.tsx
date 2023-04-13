import React from "react";
import styled from "styled-components";
import Panel from "../Panel";
import { useAppSelector } from "../../store/config";
import { ElementType, ImageElement } from "../Designs/element";

const StyledPage = styled.div`
  background-color: yellow;
  width: 1120px;
  height: 600px;
`;

const Page: React.FC = () => {
  const { elements } = useAppSelector((state) => state.page);

  const imageElements = elements.filter(
    (element) => element.type === ElementType.image
  ) as ImageElement[];

  return (
    <StyledPage>
      {imageElements.map((element) => (
        <Panel key={element.id}>
          <img
            draggable="false"
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            src={element.src}
          />
        </Panel>
      ))}
    </StyledPage>
  );
};

export default Page;
