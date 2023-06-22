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
  /* display: flex; */

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

const Calendar: React.FC<Props> = ({ initialDate, reload }) => {
  // get an array YYYYMM past 10 months and future 10 months from initialDate
  const initialPages = Array.from(Array(20).keys()).map((_, index) => {
    const year = initialDate.getFullYear();
    const month = initialDate.getMonth() + index - 10;
    return { id: `${year}${month}`, year, month };
  });

  // state for logined
  const [logined, setLogined] = useState(false);

  // flip to today's page when the diary is loaded
  const [pages, setPages] = useState(initialPages);
  const diary = useRef(null);

  const initDiary = () => {
    // 오늘 날짜의 캘린더로 이동 (캘린더 페이지가 2개씩 있으므로 10번째 페이지로 이동)
    (diary as any).current.pageFlip().flip(10);
  };

  const onLogin = () => {
    setLogined(true);
    flipNext();
    initDiary();
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
    // if (diaryPage.getCurrentPageIndex() === pages.length - 2) {
    //   reload(
    //     new Date(pages[pages.length - 1].year, pages[pages.length - 1].month, 1)
    //   );
    //   return;
    // }

    diaryPage.flipNext();
  };

  return (
    <StyledCalendar className="diary_container">
      <div className="diary_wrapper">
        {/* @ts-expect-error: 라이브러리 타입 정의 오류 */}
        <HTMLFlipBook
          className="diary"
          width={547}
          height={790}
          maxShadowOpacity={0.5}
          usePortrait={false}
          useMouseEvents={true}
          ref={diary}
        >
          <LoginPage login={onLogin} />
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
        {/* <button className="btn prev" onClick={flipPrev}>
        Prev
      </button>
      <button className="btn next" onClick={flipNext}>
        Next
      </button> */}

        {logined && (
          <>
            <div className="wing left">
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
            </div>
          </>
        )}
      </div>
    </StyledCalendar>
  );
};

export default Calendar;
