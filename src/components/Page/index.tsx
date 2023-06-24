import React, { forwardRef } from "react";
import styled, { css } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../store/config";
import type { ImageElement as ImageElementType } from "../Designs/ImageElement/imageElement";
import { ElementType } from "../Designs/Element/element";
import ImageElement from "../Designs/ImageElement";
import {
  deactivateAllElements,
  Page,
  setEditingPage
} from "../../store/slices/pageSlice";
import {
  DiaryMode,
  setDiaryMode,
  updatePage
} from "../../store/slices/diarySlice";

interface Props {
  page: Page;
  isLeftPage: boolean;
}

interface StyledProps {
  isLeftPage: boolean;
}

const StyledDiaryPage = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(53, 53, 53);

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
`;

const DiaryPage = forwardRef(function Page(
  { page, isLeftPage }: Props,
  ref: any
) {
  const { mode } = useAppSelector((state) => state.diary);

  const dispatch = useAppDispatch();

  const { elements } = page;

  const imageElements = elements.filter(
    (element) => element.type === ElementType.image
  ) as ImageElementType[];

  const handleClick = () => {
    // console.log("deactivateAll");
    // dispatch(deactivateAllElements());
  };

  const toggleDiaryMode = () => {
    if (mode === DiaryMode.viewer) {
      // 현재 page의 스크린샷 뜨기
      dispatch(setEditingPage(page));
      dispatch(setDiaryMode(DiaryMode.editor));
    } else {
      // Diary store의 Page 와 동기화
      dispatch(updatePage(page));
      dispatch(setDiaryMode(DiaryMode.viewer));
    }
  };

  return (
    <StyledDiaryPage
      className="diary_page"
      data-density="hard"
      isLeftPage={isLeftPage}
      onClick={handleClick}
      ref={ref}
    >
      <p>{page.id}</p>
      <button onClick={toggleDiaryMode}>
        {mode === DiaryMode.editor ? "View" : "Edit"}
      </button>
      {imageElements.map((element) => (
        <ImageElement key={element.id} element={element} />
      ))}
    </StyledDiaryPage>
  );
});

export default DiaryPage;
