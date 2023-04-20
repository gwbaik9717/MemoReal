import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/config";
import { addElement as addPageElement } from "../../store/slices/pageSlice";
import { ImageElement } from "../Designs/ImageElement/imageElement";

const StyledSidebar = styled.div`
  background-color: gray;
  width: 200px;

  button {
    width: 100%;
    background-color: black;
    color: #fff;
  }
`;

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const [imageSrc, setImageSrc]: any = useState(null);

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

  return (
    <StyledSidebar>
      <input accept="image/*" multiple type="file" onChange={onUpload} />
      <img width="100%" src={imageSrc} />
    </StyledSidebar>
  );
};

export default Sidebar;
