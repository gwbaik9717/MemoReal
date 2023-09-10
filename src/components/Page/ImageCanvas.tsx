import React, { useEffect, useRef, useState } from "react";

function CanvasExportWithOverlay() {
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the parent div
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current as any;
    const ctx = canvas.getContext("2d");

    // Load an image onto the canvas (e.g., replace 'image-url.jpg' with your image URL)
    const image = new Image();
    image.src =
      "https://static.waveon.io/img/apps/18146/KakaoTalk_Photo_2023-08-07-10-34-23.jpeg";
    image.onload = () => {
      const aspectRatio = image.width / image.height;
      const newWidth = 500;
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

    const scaleX = overlay.width / overlay.clientWidth;
    const scaleY = overlay.height / overlay.clientHeight;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    // Set drawing properties (e.g., line color and width)
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5 * scaleX;
    ctx.lineJoin = "round";

    // Draw a line to the current mouse position
    ctx.lineTo(x, y);

    // Stroke the path to draw the line
    ctx.stroke();
  };

  const exportOverlayAsPNG = () => {
    const overlay = overlayRef.current as any;
    const link = document.createElement("a");

    // Convert the overlay canvas content to a data URL (PNG)
    const dataURL = overlay.toDataURL("image/png");

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
            left: 0
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

export default CanvasExportWithOverlay;
