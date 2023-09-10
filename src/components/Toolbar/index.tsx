import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { DiaryMode } from "../../store/slices/diarySlice";
import { addElement as addPageElement } from "../../store/slices/pageSlice";
import { ImageElement } from "../Designs/ImageElement/imageElement";

const StyledToolbar = styled.div`
  position: absolute;
  top: -62px;
  left: 0;
  padding: 0 113px;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .hidden {
    visibility: hidden;
  }

  input {
    display: none;
  }

  .tools {
    display: flex;
    align-items: center;
  }

  .tool {
    width: 68px;
    height: 62px;
    margin-right: 12px;
    cursor: pointer;
  }

  .tool > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .tool > img {
    transform: scaleX(1);
  }

  .tool > img {
    transform: scaleX(-1);
  }
`;

const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.diary);
  const { isLeftPage } = useAppSelector((state) => state.page);
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
    const formData = new FormData();
    const reader = new FileReader();

    reader.onload = function (e: any) {
      formData.append("file", new Blob([e.target.result], { type: file.type }));
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl ?? null); // 파일의 컨텐츠
    };

    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  const handleClick = () => {
    (hiddenFileInput as any).current.click();
  };

  return (
    <>
      {mode === DiaryMode.editor && (
        <StyledToolbar className="diary_toolbar">
          <div className={`tools left ${isLeftPage ? "" : "hidden"}`}>
            <div className="tool">
              <img
                src="https://static.waveon.io/img/apps/18146/left_select.png"
                alt="select"
              />
            </div>

            <div className="tool" onClick={handleClick}>
              <img
                src="https://static.waveon.io/img/apps/18146/left_image.png"
                alt="select"
              />

              <input
                ref={hiddenFileInput}
                accept="image/*"
                multiple
                type="file"
                onChange={onUpload}
              />
            </div>
          </div>

          <div className={`tools right ${isLeftPage ? "hidden" : ""}`}>
            <div className="tool">
              <img
                src="https://static.waveon.io/img/apps/18146/right_select.png"
                alt="select"
              />
            </div>

            <div className="tool" onClick={handleClick}>
              <img
                src="https://static.waveon.io/img/apps/18146/right_image.png"
                alt="select"
              />

              <input
                ref={hiddenFileInput}
                accept="image/*"
                multiple
                type="file"
                onChange={onUpload}
              />
            </div>
          </div>
        </StyledToolbar>
      )}
    </>
  );
};

export default Toolbar;
