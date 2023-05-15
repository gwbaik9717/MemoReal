import React, { useEffect, useState } from "react";
import Editor from "../Editor";
import styled from "styled-components";
import Calendar from "../Calendar";
import { useAppDispatch, useAppSelector } from "../../store/config";
import { DiaryMode, setDiaryMode } from "../../store/slices/diarySlice";

const StyledDiary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Diary: React.FC = () => {
  const dispatch = useAppDispatch();
  const { mode } = useAppSelector((state) => state.diary);

  return (
    <>
      <button
        onClick={() => {
          dispatch(setDiaryMode(DiaryMode.viewer));
        }}
      >
        change mode
      </button>

      <StyledDiary className="diary">
        {mode === DiaryMode.calendar ? <Calendar /> : <Editor />}
      </StyledDiary>
    </>
  );
};

export default Diary;
