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
        className="handler top-left"
        onMouseDown={handleMouseDown(Direction.TopLeft)}
      ></div>

      <div
        className="handler top"
        onMouseDown={handleMouseDown(Direction.Top)}
      ></div>

      <div
        className="handler top-right"
        onMouseDown={handleMouseDown(Direction.TopRight)}
      ></div>

      <div
        className="handler right"
        onMouseDown={handleMouseDown(Direction.Right)}
      ></div>

      <div
        className="handler right-bottom"
        onMouseDown={handleMouseDown(Direction.BottomRight)}
      ></div>

      <div
        className="handler bottom"
        onMouseDown={handleMouseDown(Direction.Bottom)}
      ></div>

      <div
        className="handler bottom-left"
        onMouseDown={handleMouseDown(Direction.BottomLeft)}
      ></div>

      <div
        className="handler left"
        onMouseDown={handleMouseDown(Direction.Left)}
      ></div>
    </>
  );
};

export default Resizer;
