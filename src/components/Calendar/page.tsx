import React, { forwardRef, useState } from "react";
import styled, { css } from "styled-components";
import Calendar from "react-calendar";

interface Props {
  year: number;
  month: number;
  isLeftPage: boolean;
}

interface StyledProps {
  isLeftPage: boolean;
}

const StyledDiaryPage = styled.div<StyledProps>`
  width: 100%;
  height: 100%;
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

const CalendarPage = forwardRef(function Page(
  { year, month, isLeftPage }: Props,
  ref: any
) {
  const [calendarDate, setCalendarDate] = useState(new Date(year, month));

  return (
    <StyledDiaryPage className="diary_page" ref={ref} isLeftPage={isLeftPage}>
      <p>
        {year}년 {month + 1}월
      </p>
      <Calendar value={calendarDate} showNavigation={false} view={"month"} />
    </StyledDiaryPage>
  );
});

export default CalendarPage;
