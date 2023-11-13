import React, { useEffect, useRef, useState } from "react";

interface Props {
  imgSrc: string;
  mode: "erase" | "keep";
  category: "ai" | "edge";
  setPreviewImage: (imgSrc: string) => void;
  onClickFinish: () => void;
  setLoading: (isLoading: boolean) => void;
}

function ImageCanvas({
  category,
  imgSrc,
  mode,
  setPreviewImage,
  onClickFinish,
  setLoading
}: Props) {
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
  }, [imgSrc]);

  const endDrawing = () => {
    setIsDrawing(false);
  };

  const startDrawing = (e: any) => {
    setIsDrawing(true);

    const overlay = overlayRef.current as any;
    const ctx = overlay.getContext("2d");
    const rect = overlay.getBoundingClientRect();
    const scaleX = overlay.width / rect.width;
    const scaleY = overlay.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
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

  const exportOverlayAsPNG = async () => {
    const overlay = overlayRef.current as any;

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

    // Convert data URL to blob
    const response = await fetch(dataURL);
    const blobData = await response.blob();

    const formData = new FormData();
    formData.set("image", blobData, "overlay_drawing.png");

    const requestOptions = {
      method: "POST",
      body: formData
    };

    // Send the FormData object as a POST request to the API server
    fetch(`http://15.165.43.54:3000/images/custom/${mode}`, requestOptions)
      .then((response: any) => {
        return response.json(); // Parse the response as JSON
      })
      .then((data: any) => {
        setPreviewImage(data.imageUrl);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });
  };

  const onClickCustomize = async () => {
    setLoading(true);
    await exportOverlayAsPNG();
    setLoading(false);
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

      <div className="" onClick={onClickCustomize}>
        적용하기
      </div>

      <button
        style={{
          position: "absolute",
          top: 0,
          left: 0
        }}
        onClick={onClickFinish}
      >
        종료하기
      </button>
    </div>
  );
}

export default ImageCanvas;
