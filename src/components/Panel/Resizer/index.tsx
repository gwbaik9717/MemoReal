import React, { useState, useEffect } from "react";
import { Direction } from "./constants";

import "./styles.css";

interface Props {
  onResize: (
    direction: Direction,
    movementX: number,
    movementY: number
  ) => void;
}

const Resizer: React.FC<Props> = ({ onResize }) => {
  const [direction, setDirection] = useState<Direction | null>(null);
  const [mouseDown, setMouseDown] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      if (!direction) return;

      onResize(direction, e.movementX, e.movementY);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, direction, onResize]);

  useEffect(() => {
    const handleMouseUp = (): void => {
      setMouseDown(false);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleMouseDown = (direction: Direction) => () => {
    setDirection(direction);
    setMouseDown(true);
  };

  return (
    <>
      <div
        className="top-left"
        onMouseDown={handleMouseDown(Direction.TopLeft)}
      ></div>

      <div className="top" onMouseDown={handleMouseDown(Direction.Top)}></div>

      <div
        className="top-right"
        onMouseDown={handleMouseDown(Direction.TopRight)}
      ></div>

      <div
        className="right"
        onMouseDown={handleMouseDown(Direction.Right)}
      ></div>

      <div
        className="right-bottom"
        onMouseDown={handleMouseDown(Direction.BottomRight)}
      ></div>

      <div
        className="bottom"
        onMouseDown={handleMouseDown(Direction.Bottom)}
      ></div>

      <div
        className="bottom-left"
        onMouseDown={handleMouseDown(Direction.BottomLeft)}
      ></div>

      <div className="left" onMouseDown={handleMouseDown(Direction.Left)}></div>
    </>
  );
};

export default Resizer;
