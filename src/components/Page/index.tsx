import React, { forwardRef } from "react";
import styled from "styled-components";
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
}

const StyledDiaryPage = styled.div`
  background-image: url("https://img.freepik.com/free-photo/white-texture_1160-786.jpg?w=2000&t=st=1682045423~exp=1682046023~hmac=6b3dab945e937032ea7535af0e4456d1a93711323f332731173534095e62f69d");
  background-size: cover;
`;

const DiaryPage = forwardRef(function Page({ page }: Props, ref: any) {
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
