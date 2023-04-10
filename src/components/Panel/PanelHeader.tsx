import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledPanelHeader = styled.div`
  padding: 4px;
  background-color: gray;
`;

interface Props {
  onDrag: (movementX: number, movementY: number) => void;
}

const PanelHeader: React.FC<Props> = ({ onDrag }) => {
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseUp = (): void => {
      setMouseDown(false);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.addEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      onDrag(e.movementX, e.movementY);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, onDrag]);

  const handleMouseDown = (): void => {
    setMouseDown(true);
  };

  return (
    <StyledPanelHeader className="panel_header" onMouseDown={handleMouseDown}>
      header
    </StyledPanelHeader>
  );
};

export default PanelHeader;
