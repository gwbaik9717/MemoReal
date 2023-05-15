import React, { forwardRef, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";

interface Props {
  year: number;
  month: number;
}

const StyledDiaryPage = styled.div`
  background-image: url("https://img.freepik.com/free-photo/white-texture_1160-786.jpg?w=2000&t=st=1682045423~exp=1682046023~hmac=6b3dab945e937032ea7535af0e4456d1a93711323f332731173534095e62f69d");
  background-size: cover;
`;

const CalendarPage = forwardRef(function Page(
  { year, month }: Props,
  ref: any
) {
  const [calendarDate, setCalendarDate] = useState(new Date(year, month));

  return (
    <StyledDiaryPage className="diary_page" ref={ref}>
      <p>
        {year}년 {month + 1}월
      </p>
      <Calendar value={calendarDate} showNavigation={false} view={"month"} />
    </StyledDiaryPage>
  );
});

export default CalendarPage;
