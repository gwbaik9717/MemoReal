import React from "react";
import styled from "styled-components";
import Element from "../Element";

import { ImageElement as ImageElementType } from "./imageElement";

interface Props {
  element: ImageElementType;
}

const StyledUserImg = styled.img`
  object-fit: cover;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -ms-user-select: none; /* IE/Edge */
  user-select: none;
`;

const ImageElement: React.FC<Props> = ({ element }) => {
  return (
    <Element element={element}>
      <StyledUserImg
        draggable="false"
        width="100%"
        height="100%"
        src={element.src}
      />
    </Element>
  );
};

export default ImageElement;
