import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../store/config";
import { PageMode } from "../../../store/slices/pageSlice";
import Panel from "../../Panel";
import { Element as ElementType } from "./element";

interface Props {
  children: React.ReactNode;
  element: ElementType;
}

const StyledViewerElement = styled.div`
  position: absolute;
`;

const Element: React.FC<Props> = ({ children, element }) => {
  const { mode } = useAppSelector((state) => state.page);
  const { x, y, width, height } = element;

  const dynamicElementStyle = {
    top: `${y}px`,
    left: `${x}px`,
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <>
      {mode === PageMode.editor ? (
        <Panel element={element}>{children}</Panel>
      ) : (
        <StyledViewerElement style={dynamicElementStyle}>
          {children}
        </StyledViewerElement>
      )}
    </>
  );
};

export default Element;
