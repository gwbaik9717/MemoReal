import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Diary from "../components/Diary";
import { DiaryMode, setDiaryMode } from "../store/slices/diarySlice";

const StyledDiaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://static.waveon.io/img/apps/18146/backgroundTexture.png");
  background-size: cover;
  background-repeat: no-repeat;
`;

const EditPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDiaryMode(DiaryMode.viewer));
  }, []);
  return (
    <StyledDiaryContainer className="diary_container">
      <Diary mode={DiaryMode.editor} />
    </StyledDiaryContainer>
  );
};

export default EditPage;
