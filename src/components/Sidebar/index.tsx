import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { DiaryMode } from "../../store/slices/diarySlice";
import { addElement as addPageElement } from "../../store/slices/pageSlice";
import { ImageElement } from "../Designs/ImageElement/imageElement";

const StyledSidebar = styled.div`
  background-color: gray;
  width: 60px;

  input {
    display: none;
  }

  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-color: red !important;
    color: #fff;
    cursor: not-allowed;
    opacity: 0.1;
  }

  .btn.active {
    opacity: 1;
    cursor: pointer;
  }
`;

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.diary);
  const [imageSrc, setImageSrc]: any = useState(null);
  const hiddenFileInput = React.useRef<null | HTMLInputElement>(null);

  useEffect(() => {
    if (imageSrc) {
      const imageElement = new ImageElement();

      imageElement.src = imageSrc;

      dispatch(addPageElement(imageElement));
    }
  }, [imageSrc]);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result ?? null); // 파일의 컨텐츠
        resolve();
      };
    });
  };

  const handleClick = () => {
    (hiddenFileInput as any).current.click();
  };

  return (
    <StyledSidebar className="diary_sidebar">
      <div
        className={`btn ${mode === DiaryMode.editor ? "active" : ""}`}
        onClick={handleClick}
      >
        Upload
      </div>
      <input
        ref={hiddenFileInput}
        accept="image/*"
        multiple
        type="file"
        onChange={onUpload}
      />
    </StyledSidebar>
  );
};

export default Sidebar;
