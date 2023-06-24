import React, { useRef } from "react";
import DiaryPage from "../Page";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import { useAppSelector } from "../../store/config";

const StyledEditor = styled.div`
  .diary_wrapper {
    display: flex;
  }

  .diary_wrapper .diary {
    order: 1;
  }

  .diary_wrapper .wing {
    width: 60px;
    height: 790px;
  }

  .diary_wrapper .wing img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .diary_wrapper .wing.left {
    order: 0;
  }

  .diary_wrapper .wing.right {
    order: 2;
  }
`;

const Editor: React.FC = () => {
  const { pages } = useAppSelector((state) => state.diary);
  const editingPage = useAppSelector((state) => state.page);
  const diary = useRef(null);

  return (
    <StyledEditor className="diary_container">
      <div className="diary_wrapper">
        {/* @ts-expect-error: 라이브러리 타입 정의 오류 */}
        <HTMLFlipBook
          className="diary"
          width={547}
          height={790}
          maxShadowOpacity={0.5}
          usePortrait={false}
          useMouseEvents={false}
          ref={diary}
        >
          {pages.map((page, index) => (
            <DiaryPage
              key={page.id}
              page={editingPage.id === page.id ? editingPage : page}
              isLeftPage={index % 2 === 0}
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

        {/* <div className="wing left">
          <img
            src="https://static.waveon.io/img/apps/18146/cover_left.png"
            alt="left_wing"
          />
        </div>
        <div className="wing right">
          <img
            src="https://static.waveon.io/img/apps/18146/cover_right_1687413440131.png"
            alt="left_wing"
          />
        </div> */}

        <Sidebar />
      </div>
    </StyledEditor>
  );
};

export default Editor;
