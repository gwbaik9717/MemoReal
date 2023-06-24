import React, { useRef } from "react";
import DiaryPage from "../Page";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { useNavigate } from "react-router-dom";
import {
  DiaryMode,
  setDiaryMode,
  updatePage
} from "../../store/slices/diarySlice";
import { setEditingPage } from "../../store/slices/pageSlice";
import Toolbar from "../Toolbar";

const StyledEditor = styled.div`
  .diary_wrapper {
    display: flex;
    position: relative;
  }

  .diary {
    order: 1;
  }

  .wing {
    width: 60px;
    height: 790px;
    position: relative;
  }

  .wing > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .wing.left {
    order: 0;
  }

  .wing .postit {
    width: 79px;
    height: 63px;
    position: absolute;
    cursor: pointer;
  }

  .wing.left .postit.mode {
    top: 77px;
    right: 0px;
  }

  .wing.left .postit.calendar {
    top: 548px;
    right: 31px;
  }

  .wing.right .postit.mode {
    top: 77px;
    left: 0px;
  }

  .wing .postit > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .wing.right {
    order: 2;
  }
`;

const Editor: React.FC = () => {
  const { pages, mode } = useAppSelector((state) => state.diary);
  const dispatch = useAppDispatch();
  const editingPage = useAppSelector((state) => state.page);
  const diary = useRef(null) as any;
  const navigate = useNavigate();

  const onClickShowCalendar = () => {
    navigate("/");
  };

  const toggleDiaryMode = (i: number) => {
    // 왼쪽 페이지이면 i=0, 오른쪽 페이지이면 i=1
    const currentPageIndex = diary.current
      .pageFlip()
      .getCurrentPageIndex() as number;

    const currentPage = pages[currentPageIndex + i];

    if (mode === DiaryMode.viewer) {
      // 현재 page의 스크린샷 뜨기
      dispatch(setEditingPage({ ...currentPage, isLeftPage: i === 0 }));
      dispatch(setDiaryMode(DiaryMode.editor));
    } else {
      // Diary store의 Page 와 동기화
      dispatch(updatePage(editingPage));
      dispatch(setDiaryMode(DiaryMode.viewer));
    }
  };

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
              diary={diary}
            />
          ))}
        </HTMLFlipBook>

        <div className="wing left">
          <img
            src="https://static.waveon.io/img/apps/18146/cover_left.png"
            alt="left_wing"
          />

          <div
            className="postit mode"
            onClick={() => {
              toggleDiaryMode(0);
            }}
          >
            <img
              src={
                mode === DiaryMode.viewer || !editingPage.isLeftPage
                  ? "https://static.waveon.io/img/apps/18146/left_view.png"
                  : "https://static.waveon.io/img/apps/18146/left_edit.png"
              }
              alt="edit_mode_left_wing"
            />
          </div>

          <div className="postit calendar" onClick={onClickShowCalendar}>
            <img
              src="https://static.waveon.io/img/apps/18146/calander.png"
              alt="edit_mode_left_wing"
            />
          </div>
        </div>

        <div className="wing right">
          <img
            src="https://static.waveon.io/img/apps/18146/cover_right_1687413440131.png"
            alt="right_wing"
          />

          <div
            className="postit mode"
            onClick={() => {
              toggleDiaryMode(1);
            }}
          >
            <img
              src={
                mode === DiaryMode.viewer || editingPage.isLeftPage
                  ? "https://static.waveon.io/img/apps/18146/right_view.png"
                  : "https://static.waveon.io/img/apps/18146/right_edit.png"
              }
              alt="edit_mode_right_wing"
            />
          </div>
        </div>

        <Toolbar />
      </div>
    </StyledEditor>
  );
};

export default Editor;
