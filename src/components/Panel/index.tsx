import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/config";
import {
  activateElement,
  deactivateAllElements,
  moveElement,
  setElementPositionAndSize
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

    /*
     * 만약 move 와 resize 를 각각 dispatch 하면
     * 제대로 작동하지 않는 오류가 있어 이 둘을 동시에 처리
     */
    const setElementPositionAndSizeBy = (
      dx: number = 0,
      dy: number,
      dw: number,
      dh: number
    ) => {
      dispatch(
        setElementPositionAndSize({
          id: element.id,
          x: element.x + dx,
          y: element.y + dy,
          width: element.width + dw,
          height: element.height + dh
        })
      );
    };

    switch (direction) {
      case Direction.TopLeft:
        setElementPositionAndSizeBy(
          movementX,
          movementY,
          -1 * movementX,
          -1 * movementY
        );
        break;

      case Direction.Top:
        setElementPositionAndSizeBy(0, movementY, 0, -1 * movementY);
        break;

      case Direction.TopRight:
        setElementPositionAndSizeBy(0, movementY, movementX, -1 * movementY);
        break;

      case Direction.Right:
        setElementPositionAndSizeBy(0, 0, movementX, 0);
        break;

      case Direction.BottomRight:
        setElementPositionAndSizeBy(0, 0, movementX, movementY);
        break;

      case Direction.Bottom:
        setElementPositionAndSizeBy(0, 0, 0, movementY);
        break;

      case Direction.BottomLeft:
        setElementPositionAndSizeBy(movementX, 0, -1 * movementX, movementY);
        break;

      case Direction.Left:
        setElementPositionAndSizeBy(movementX, 0, -1 * movementX, 0);
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
