import React, { useRef } from "react";
import DiaryPage from "../Page";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import { useAppSelector } from "../../store/config";

const StyledEditor = styled.div`
  display: flex;

  .diary {
    order: 1;
  }

  .diary_sidebar {
    order: 3;
  }

  .btn {
    background-color: yellow;
  }

  .btn.prev {
    order: 0;
  }

  .btn.next {
    order: 2;
  }
`;

const Editor: React.FC = () => {
  const { pages } = useAppSelector((state) => state.diary);
  const editingPage = useAppSelector((state) => state.page);
  const diary = useRef(null);

  return (
    <StyledEditor>
      {/* @ts-expect-error: 라이브러리 타입 정의 오류 */}
      <HTMLFlipBook
        className="diary"
        width={550}
        height={733}
        maxShadowOpacity={0.5}
        usePortrait={false}
        useMouseEvents={false}
        ref={diary}
      >
        {pages.map((page) => (
          <DiaryPage
            key={page.id}
            page={editingPage.id === page.id ? editingPage : page}
          />
        ))}
      </HTMLFlipBook>
      <button
        className="btn prev"
        onClick={() => {
          (diary as any).current.pageFlip().flipPrev();
        }}
      >
        Prev
      </button>
      <button
        className="btn next"
        onClick={() => {
          (diary as any).current.pageFlip().flipNext();
        }}
      >
        Next
      </button>
      <Sidebar />
    </StyledEditor>
  );
};

export default Editor;
