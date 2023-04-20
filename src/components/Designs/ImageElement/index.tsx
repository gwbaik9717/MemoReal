import React from "react";
import Element from "../Element";

import { ImageElement as ImageElementType } from "./imageElement";

interface Props {
  element: ImageElementType;
}

const ImageElement: React.FC<Props> = ({ element }) => {
  return (
    <Element element={element}>
      <img
        draggable="false"
        width="100%"
        height="100%"
        style={{ objectFit: "cover" }}
        src={element.src}
      />
    </Element>
  );
};

export default ImageElement;
