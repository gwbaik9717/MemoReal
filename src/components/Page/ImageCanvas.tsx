import React, { useEffect, useRef, useState } from "react";

interface Props {
  imgSrc: string;
  mode: "erase" | "recovery";
}

function ImageCanvas({ imgSrc, mode }: Props) {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the parent div
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    // if mode is changed, clear overlay canvas definitely
    const overlay = overlayRef.current as any;
    const ctx = overlay.getContext("2d");

    // clear overlay canvas
    ctx.clearRect(0, 0, overlay.width, overlay.height);
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const ctx = canvas.getContext("2d");

    // Load an image onto the canvas (e.g., replace 'image-url.jpg' with your image URL)
    const image = new Image();
    image.src = imgSrc;
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const newWidth = 300;
      const newHeight = newWidth / aspectRatio;

      canvas.width = newWidth;
      canvas.height = newHeight;

      if (containerRef.current) {
        containerRef.current.style.width = `${newWidth}px`;
        containerRef.current.style.height = `${newHeight}px`;
      }

      // Draw the image on the canvas
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, []);

  const startDrawing = (e: any) => {
    setIsDrawing(true);
    draw(e);
  };

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const draw = (e: any) => {
    if (!isDrawing) return;

    const overlay = overlayRef.current as any;
    const ctx = overlay.getContext("2d");
    const rect = overlay.getBoundingClientRect();

    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Set drawing properties
    ctx.strokeStyle = mode === "erase" ? "rgb(255, 0, 0)" : "rgb(0, 255, 0)";
    ctx.lineWidth = 5 * scaleX; // Adjust line width based on canvas size
    ctx.lineJoin = "round";

    // Draw a line to the current mouse position
    ctx.lineTo(x, y);

    // Stroke the path to draw the line
    ctx.stroke();
  };

  const exportOverlayAsPNG = () => {
    const overlay = overlayRef.current as any;
    const link = document.createElement("a");

    // Create a temporary canvas to adjust the size
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    // Get the actual size of the overlay canvas
    const rect = overlay.getBoundingClientRect();

    // Set the size of the temporary canvas to the actual size of the overlay canvas
    tempCanvas.width = rect.width;
    tempCanvas.height = rect.height;

    // Draw the overlay canvas onto the temporary canvas
    tempCtx?.drawImage(overlay, 0, 0, tempCanvas.width, tempCanvas.height);

    // Convert the temporary canvas content to a data URL (PNG)
    const dataURL = tempCanvas.toDataURL("image/png");

    // Set the data URL as the link's href
    link.href = dataURL;
    link.download = "overlay_drawing.png";

    // Trigger a click on the link to start the download
    link.click();
  };

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          position: "relative"
        }}
      >
        <canvas ref={canvasRef} />
        <canvas
          ref={overlayRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
        />
      </div>

      <button
        onClick={exportOverlayAsPNG}
        style={{
          position: "absolute",
          top: 0,
          left: 0
        }}
      >
        Export as PNG
      </button>
    </div>
  );
}

export default ImageCanvas;
