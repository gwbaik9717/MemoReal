import React, { useRef } from "react";
import styled from "styled-components";
import PanelHeader from "./PanelHeader";
import Resizer from "./Resizer";
import { Direction } from "./Resizer/constants";

const StyledPanel = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  width: 200px;
  height: 200px;
  border: 1px solid black;
  box-sizing: border-box;

  .panel_container {
    position: relative;
    height: 100%;
  }

  .panel_content {
    padding: 4px;
  }
`;

interface Props {
  children: React.ReactNode;
}

const Panel: React.FC<Props> = ({ children }) => {
  const panelRef = useRef<null | HTMLDivElement>(null);

  const handleDrag = (movementX: number, movementY: number): void => {
    const panel = panelRef.current;

    if (!panel) return;

    const { x, y } = panel.getBoundingClientRect();

    panel.style.left = `${x + movementX}px`;
    panel.style.top = `${y + movementY}px`;
  };

  const handleResize = (
    direction: Direction,
    movementX: number,
    movementY: number
  ): void => {
    const panel = panelRef.current;
    if (!panel) return;

    const { width, height, x, y } = panel.getBoundingClientRect();

    const resizeTop = (): void => {
      panel.style.height = `${height - movementY}px`;
      panel.style.top = `${y + movementY}px`;
    };

    const resizeRight = (): void => {
      panel.style.width = `${width + movementX}px`;
    };

    const resizeBottom = (): void => {
      panel.style.height = `${height + movementY}px`;
    };

    const resizeLeft = (): void => {
      panel.style.width = `${width - movementX}px`;
      panel.style.left = `${x + movementX}px`;
    };

    switch (direction) {
      case Direction.TopLeft:
        resizeTop();
        resizeLeft();
        break;

      case Direction.Top:
        resizeTop();
        break;

      case Direction.TopRight:
        resizeTop();
        resizeRight();
        break;

      case Direction.Right:
        resizeRight();
        break;

      case Direction.BottomRight:
        resizeBottom();
        resizeRight();
        break;

      case Direction.Bottom:
        resizeBottom();
        break;

      case Direction.BottomLeft:
        resizeBottom();
        resizeLeft();
        break;

      case Direction.Left:
        resizeLeft();
        break;

      default:
        break;
    }
  };

  return (
    <StyledPanel className="panel" ref={panelRef}>
      <div className="panel_container">
        <Resizer onResize={handleResize} />
        <PanelHeader onDrag={handleDrag} />
        <div className="panel_content">{children}</div>
      </div>
    </StyledPanel>
  );
};

export default Panel;
