import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../store/config";
import type { ImageElement as ImageElementType } from "../Designs/ImageElement/imageElement";
import { ElementType } from "../Designs/Element/element";
import ImageElement from "../Designs/ImageElement";

const StyledPage = styled.div`
  background-color: yellow;
  width: 1120px;
  height: 600px;
`;

const Page: React.FC = () => {
  const { elements } = useAppSelector((state) => state.page);

  const imageElements = elements.filter(
    (element) => element.type === ElementType.image
  ) as ImageElementType[];

  return (
    <StyledPage>
      {imageElements.map((element) => (
        <ImageElement key={element.id} element={element} />
      ))}
    </StyledPage>
  );
};

export default Page;
