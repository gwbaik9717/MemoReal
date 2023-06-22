import React from "react";
import moment from "moment";

interface Props {
  date: Date;
}

export default function CalendarTile({ date }: Props) {
  const dayList = ["2023-06-22", "2023-06-24", "2023-06-25"];
  const contents = [];

  // 오늘일 경우
  if (date.toDateString() === new Date().toDateString()) {
    contents.push(
      <div
        style={{
          width: "61px",
          height: "25px",
          background: "rgba(195, 218, 232, 0.68)",
          borderRadius: "7px"
        }}
      ></div>
    );
  }
  // 그 외의 날짜에는 특정 이미지를 띄워줌
  else if (dayList.find((day) => day === moment(date).format("YYYY-MM-DD"))) {
    contents.push(
      <>
        {date.getDay() === 6 ? (
          <img
            src="https://static.waveon.io/img/apps/18146/saturday.png"
            className="diaryImg"
            width="32"
            height="32"
            alt="today is..."
          />
        ) : date.getDay() === 0 ? (
          <img
            src="https://static.waveon.io/img/apps/18146/sunday.png"
            className="diaryImg"
            width="32"
            height="32"
            alt="today is..."
          />
        ) : (
          <img
            src="https://static.waveon.io/img/apps/18146/weekday.png"
            className="diaryImg"
            width="32"
            height="32"
            alt="today is..."
          />
        )}
      </>
    );
  }

  return (
    <div
      className="flag"
      style={{
        position: "absolute",
        top: "0",
        left: "0"
      }}
    >
      {contents}
    </div>
  );
}
