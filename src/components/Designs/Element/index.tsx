import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../../store/config";
import { DiaryMode } from "../../../store/slices/diarySlice";
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
  const { mode } = useAppSelector((state) => state.diary);
  const { x, y, width, height } = element;

  const dynamicElementStyle = {
    top: `${y}px`,
    left: `${x}px`,
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <>
      {mode === DiaryMode.editor ? (
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
