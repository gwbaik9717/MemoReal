import React, { useRef, useState } from "react";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";
import CalendarPage from "./page";
import LoginPage from "../Cover/login";
import CoverPage from "../Cover/cover";

interface Props {
  reload: (initialDate: Date) => void;
  initialDate: Date;
}

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

const Calendar: React.FC<Props> = ({ initialDate, reload }) => {
  // get an array YYYYMM past 10 months and future 10 months from initialDate
  const initialPages = Array.from(Array(20).keys()).map((_, index) => {
    const year = initialDate.getFullYear();
    const month = initialDate.getMonth() + index - 10;
    return { id: `${year}${month}`, year, month };
  });

  // flip to today's page when the diary is loaded
  const [pages, setPages] = useState(initialPages);
  const diary = useRef(null);

  const initDiary = () => {
    (diary as any).current.pageFlip().flip(10);
  };

  const flipPrev = () => {
    const diaryPage = (diary as any).current.pageFlip();

    // reload when the first page is reached
    if (diaryPage.getCurrentPageIndex() === 0) {
      reload(new Date(pages[0].year, pages[0].month, 1));
      return;
    }

    diaryPage.flipPrev();
  };

  const flipNext = () => {
    const diaryPage = (diary as any).current.pageFlip();

    // reload when the last page is reached
    if (diaryPage.getCurrentPageIndex() === pages.length - 2) {
      reload(
        new Date(pages[pages.length - 1].year, pages[pages.length - 1].month, 1)
      );
      return;
    }

    diaryPage.flipNext();
  };

  return (
    <StyledCalendar>
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
        <LoginPage />
        <CoverPage />
        {pages.map((page, index) => (
          <CalendarPage
            key={page.id}
            year={page.year}
            month={page.month}
            isLeftPage={index % 2 === 0}
          />
        ))}
      </HTMLFlipBook>
      <button className="btn prev" onClick={flipPrev}>
        Prev
      </button>
      <button className="btn next" onClick={flipNext}>
        Next
      </button>
    </StyledCalendar>
  );
};

export default Calendar;
