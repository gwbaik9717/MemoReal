import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/config";
import {
  activateElement,
  deactivateAllElements,
  moveElement,
  resizeElement
} from "../../store/slices/pageSlice";
import { Element } from "../Designs/Element/element";
import Popover from "./Popover";
import Resizer from "./Resizer";
import { Direction } from "./Resizer/constants";

const StyledPanel = styled.div`
  position: absolute;
  border: 1px solid black;
  box-sizing: border-box;

  .panel_container {
    position: relative;
    height: 100%;
  }

  .panel_content {
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  children: React.ReactNode;
  element: Element;
}

const Panel: React.FC<Props> = ({ element, children }) => {
  const panelRef = useRef<null | HTMLDivElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const dispatch = useAppDispatch();

  const { isActivated } = element.metadata;

  const dynamicPanelStyle = {
    top: `${element.y}px`,
    left: `${element.x}px`,
    width: `${element.width}px`,
    height: `${element.height}px`
  };

  const handleDrag = (movementX: number, movementY: number): void => {
    const panel = panelRef.current;

    if (!panel) return;

    dispatch(
      moveElement({
        id: element.id,
        x: element.x + movementX,
        y: element.y + movementY
      })
    );
  };

  const handleResize = (
    direction: Direction,
    movementX: number,
    movementY: number
  ): void => {
    const panel = panelRef.current;
    if (!panel) return;

    const resizeBy = (dw: number, dh: number) => {
      dispatch(
        resizeElement({
          id: element.id,
          width: element.width + dw,
          height: element.height + dh
        })
      );
    };

    const moveBy = (dx: number, dy: number) => {
      dispatch(
        moveElement({
          id: element.id,
          x: element.x + dx,
          y: element.y + dy
        })
      );
    };

    switch (direction) {
      case Direction.TopLeft:
        moveBy(movementX, movementY);
        resizeBy(-1 * movementX, -1 * movementY);
        break;

      case Direction.Top:
        moveBy(0, movementY);
        resizeBy(0, -1 * movementY);
        break;

      case Direction.TopRight:
        moveBy(0, movementY);
        resizeBy(movementX, -1 * movementY);
        break;

      case Direction.Right:
        resizeBy(movementX, 0);
        break;

      case Direction.BottomRight:
        resizeBy(movementX, movementY);
        break;

      case Direction.Bottom:
        resizeBy(0, movementY);
        break;

      case Direction.BottomLeft:
        moveBy(movementX, 0);
        resizeBy(-1 * movementX, movementY);
        break;

      case Direction.Left:
        moveBy(movementX, 0);
        resizeBy(-1 * movementX, 0);
        break;

      default:
        break;
    }
  };

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
      handleDrag(e.movementX, e.movementY);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, handleDrag]);

  const handleMouseDown = (e: any): void => {
    setMouseDown(true);
    e.stopPropagation();

    if (!isActivated) {
      dispatch(deactivateAllElements());
      dispatch(activateElement(element.id));
    }
  };

  return (
    <StyledPanel className="panel" ref={panelRef} style={dynamicPanelStyle}>
      <div className="panel_container">
        {isActivated ? (
          <>
            <Resizer onResize={handleResize} />

            <div className="panel_content" onMouseDown={handleMouseDown}>
              {children}
            </div>

            {/* Resize Observer 오류 발생
            <Popover>
              <div className="panel_content" onMouseDown={handleMouseDown}>
                {children}
              </div>
            </Popover> */}
          </>
        ) : (
          <div className="panel_content" onMouseDown={handleMouseDown}>
            {children}
          </div>
        )}
      </div>
    </StyledPanel>
  );
};

export default Panel;
