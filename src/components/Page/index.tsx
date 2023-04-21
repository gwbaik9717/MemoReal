import React, { forwardRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/config";
import type { ImageElement as ImageElementType } from "../Designs/ImageElement/imageElement";
import { ElementType } from "../Designs/Element/element";
import ImageElement from "../Designs/ImageElement";
import { deactivateAllElements } from "../../store/slices/pageSlice";

interface Props {
  pageNumber: number;
}

const StyledPage = styled.div`
  background-image: url("https://img.freepik.com/free-photo/white-texture_1160-786.jpg?w=2000&t=st=1682045423~exp=1682046023~hmac=6b3dab945e937032ea7535af0e4456d1a93711323f332731173534095e62f69d");
  background-size: cover;
`;

const Page = forwardRef(function Page({ pageNumber }: Props, ref: any) {
  const { elements } = useAppSelector((state) => state.page);
  // const dispatch = useAppDispatch();

  const imageElements = elements.filter(
    (element) => element.type === ElementType.image
  ) as ImageElementType[];

  const handleClick = () => {
    // console.log("deactivateAll");
    // dispatch(deactivateAllElements());
  };

  return (
    <StyledPage className="diary_page" onClick={handleClick} ref={ref}>
      <p>{pageNumber}</p>
      {imageElements.map((element) => (
        <ImageElement key={element.id} element={element} />
      ))}
    </StyledPage>
  );
});

export default Page;
