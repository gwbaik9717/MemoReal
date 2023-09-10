import React, { forwardRef, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import type { ImageElement as ImageElementType } from "../Designs/ImageElement/imageElement";
import { ElementType } from "../Designs/Element/element";
import ImageElement from "../Designs/ImageElement";
import { deactivateAllElements, Page } from "../../store/slices/pageSlice";
import { useAppDispatch } from "../../store/config";
import ImageCanvas from "./ImageCanvas";

interface Props {
  page: Page;
  isLeftPage: boolean;
  diary: any;
}

interface StyledProps {
  isLeftPage: boolean;
}

const StyledDiaryPage = styled.div<StyledProps>`
  ${({ isLeftPage }) =>
    isLeftPage
      ? css`
          background: linear-gradient(
            to right,
            #777777 0.1%,
            #d1d3d4 0.3%,
            #d4d5d6 10%,
            #eaeaea 50%,
            #fefeff 90%,
            #f6f7f6 97%,
            #e3e3e3 99%,
            #4b4c4e 100%
          );

          border-radius: 0% 1% 1% 0%;
        `
      : css`
          background: linear-gradient(
            to right,
            #8f9495 0.1%,
            #e2e3e5 1%,
            #cfd2d2 4%,
            #cfd2d2 5%,
            #eaebec 30%,
            #eeeeef 50%,
            #f6f6f6 90%,
            #f1f1f3 99.7%,
            #444444 100%
          );

          border-radius: 0.5% 0% 0% 0.5%;
        `}

  .navigation {
    width: 74px;
    height: 70px;
    position: absolute;
    bottom: 0;
    ${({ isLeftPage }) =>
      isLeftPage
        ? css`
            left: 0;
          `
        : css`
            right: 0;
          `}
  }

  .navigation > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const DiaryPage = forwardRef(function Page(
  { page, isLeftPage, diary }: Props,
  ref: any
) {
  const { elements } = page;
  const dispatch = useAppDispatch();

  const imageElements = elements.filter(
    (element) => element.type === ElementType.image
  ) as ImageElementType[];

  const handleClick = () => {
    dispatch(deactivateAllElements());
  };

  return (
    <StyledDiaryPage
      className="diary_page"
      isLeftPage={isLeftPage}
      data-density="hard"
      onClick={handleClick}
      ref={ref}
    >
      {imageElements.map((element) => (
        <ImageElement key={element.id} element={element} />
      ))}

      {/* <ImageCanvas /> */}

      {isLeftPage ? (
        <div
          className="navigation"
          onClick={() => {
            diary.current.pageFlip().flipPrev();
          }}
        >
          <img
            src="https://static.waveon.io/img/apps/18146/left_prev_btn.png"
            alt="navgation_prev"
          />
        </div>
      ) : (
        <div
          className="navigation"
          onClick={() => {
            diary.current.pageFlip().flipNext();
          }}
        >
          <img
            src="https://static.waveon.io/img/apps/18146/right_next_btn.png"
            alt="navgation_prev"
          />
        </div>
      )}
    </StyledDiaryPage>
  );
});

export default DiaryPage;
