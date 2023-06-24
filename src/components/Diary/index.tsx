import React, { useEffect, useState } from "react";
import Editor from "../Editor";
import styled from "styled-components";
import Calendar from "../Calendar";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { DiaryMode, setDiaryMode } from "../../store/slices/diarySlice";

interface Props {
  mode: DiaryMode;
}

const StyledDiary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Diary: React.FC<Props> = ({ mode }) => {
  //const dispatch = useAppDispatch();
  // const { mode } = useAppSelector((state) => state.diary);

  // key for rerendering HTMLFlipBook
  const [key, setKey] = useState(0);

  // state for initial calendar date
  const [initialCalendarDate, setInitialCalendarDate] = useState(new Date());

  const reload = (initialDate: Date) => {
    // console.log(initialDate);
    setInitialCalendarDate(initialDate);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      {/* <button
        onClick={() => {
          dispatch(setDiaryMode(DiaryMode.viewer));
        }}
      >
        change mode
      </button> */}

      <StyledDiary className="diary">
        {mode === DiaryMode.calendar ? (
          <Calendar
            key={`diary-calendar-${key}`}
            reload={reload}
            initialDate={initialCalendarDate}
          />
        ) : (
          <Editor />
        )}
      </StyledDiary>
    </>
  );
};

export default Diary;
