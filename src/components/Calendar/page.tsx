import React, { forwardRef, useState } from "react";
import styled, { css } from "styled-components";
import Calendar from "react-calendar";
import CalendarTile from "./tile";
import { DiaryMode, setDiaryMode } from "../../store/slices/diarySlice";
import { useAppDispatch } from "../../store/config";
import { useNavigate } from "react-router-dom";
// import "react-calendar/dist/Calendar.css";
interface Props {
  year: number;
  month: number;
  isLeftPage: boolean;
}

interface StyledProps {
  isLeftPage: boolean;
}

const StyledDiaryPage = styled.div<StyledProps>`
  @import url("https://fonts.googleapis.com/css2?family=Amatic+SC&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Baloo+2&display=swap");

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 41px 22px 49px 49px;

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

  .top {
    text-align: center;
    margin-bottom: 56px;
    font-family: "Amatic SC", cursive;
  }

  .top .subtitle {
    font-weight: 700;
    font-size: 30px;
    line-height: 38px;
  }

  .top .title {
    font-weight: 400;
    font-size: 60px;
    line-height: 76px;
  }

  .react_calendar {
    width: 100% !important;
  }

  .react-calendar__month-view__weekdays__weekday {
    color: blue;
    height: 43px;
    text-align: center;
  }

  .react-calendar__month-view__weekdays__weekday.react-calendar__month-view__weekdays__weekday--weekend {
    color: green;
  }

  .react-calendar__tile {
    font-family: "Baloo 2", cursive;
    text-align: left;
    font-size: 16px;
    line-height: 26px;
    height: 32px;
    margin-bottom: 53px;
    position: relative;
    padding: 0 0 3px 3px;
  }

  .react-calendar__tile abbr {
    z-index: 1;
    position: relative;
  }
`;

const CalendarPage = forwardRef(function Page(
  { year, month, isLeftPage }: Props,
  ref: any
) {
  const [calendarDate, setCalendarDate] = useState(new Date(year, month));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClickDay = (value: Date, event: any) => {
    // dispatch(setDiaryMode(DiaryMode.editor));
    // open in new tab
    window.open("/edit", "_blank");
    // navigate("/edit");
  };

  return (
    <StyledDiaryPage className="diary_page" ref={ref} isLeftPage={isLeftPage}>
      <div className="top">
        <div className="subtitle">{month + 1}</div>
        <div className="title">
          {new Date(year, month).toLocaleString("en-US", {
            month: "long"
          })}
        </div>
      </div>
      <Calendar
        value={calendarDate}
        showNavigation={false}
        tileContent={CalendarTile}
        view={"month"}
        calendarType="US"
        formatDay={(locale, date) => date.getDate().toString()}
        showNeighboringMonth={false}
        onClickDay={onClickDay}
      />
    </StyledDiaryPage>
  );
});

export default CalendarPage;
