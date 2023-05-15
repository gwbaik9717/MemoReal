import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import { useAppSelector } from "../../store/config";
import CalendarPage from "./page";

const StyledCalendar = styled.div`
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

const Calendar: React.FC = () => {
  // get an array YYYYMM starting from today to 10 months later
  // const initialPages = Array.from(Array(10).keys()).map((_, index) => {
  //   const today = new Date();
  //   const year = today.getFullYear();
  //   const month = today.getMonth() + index;
  //   return { id: `${year}${month}`, year, month };
  // });

  // get an array YYYYMM past 10 months and future 10 months from today
  const initialPages = Array.from(Array(20).keys()).map((_, index) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + index - 10;
    return { id: `${year}${month}`, year, month };
  });

  // flip to today's page when the diary is loaded
  // const [currentPage, setCurrentPage] = useState(initialPages[10]);
  const [pages, setPages] = useState(initialPages);
  const diary = useRef(null);

  const initDiary = () => {
    // repeat 10 times flipping to next page with 1 second interval
    // for (let i = 0; i < 5; i++) {
    //   setTimeout(() => {
    //     (diary as any).current.pageFlip().flipNext();
    //   }, 800 * i);
    // }

    (diary as any).current.pageFlip().flip(10);
  };

  return (
    <StyledCalendar>
      {/* @ts-expect-error: 라이브러리 타입 정의 오류 */}
      <HTMLFlipBook
        className="diary"
        width={550}
        height={733}
        maxShadowOpacity={0.5}
        usePortrait={false}
        useMouseEvents={false}
        onInit={initDiary}
        ref={diary}
      >
        {pages.map((page) => (
          <CalendarPage key={page.id} year={page.year} month={page.month} />
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
    </StyledCalendar>
  );
};

export default Calendar;
