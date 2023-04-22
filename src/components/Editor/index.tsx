import React, { useEffect, useState } from "react";
import DiaryPage from "../Page";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { DiaryMode } from "../../store/slices/diarySlice";

const StyledEditor = styled.div`
  display: flex;
`;

const Editor: React.FC = () => {
  const { pages, mode } = useAppSelector((state) => state.diary);
  const editingPage = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  // const isViewerMode: boolean = mode === DiaryMode.viewer;
  // console.log(isViewerMode);

  return (
    <StyledEditor>
      {/* @ts-expect-error: 라이브러리 타입 정의 오류 */}
      <HTMLFlipBook
        width={550}
        height={733}
        maxShadowOpacity={0.5}
        usePortrait={false}
        useMouseEvents={mode === DiaryMode.viewer}
      >
        {pages.map((page) => (
          <DiaryPage
            key={page.id}
            page={editingPage.id === page.id ? editingPage : page}
          />
        ))}
        {/* {isViewerMode
          ? pages.map((page) => (
              <DiaryPage
                key={page.id}
                page={page}
                setEditingPageId={setEditingPageId}
              />
            ))
          : pages.map((page) =>
              editingPageId === page.id ? (
                <DiaryPage
                  page={editingPage}
                  setEditingPageId={setEditingPageId}
                  key={page.id}
                />
              ) : (
                <DiaryPage
                  page={page}
                  setEditingPageId={setEditingPageId}
                  key={page.id}
                />
              )
            )} */}
      </HTMLFlipBook>
      {mode === DiaryMode.editor && <Sidebar />}
    </StyledEditor>
  );
};

export default Editor;
