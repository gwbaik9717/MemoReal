import React from "react";
import styled from "styled-components";
import Diary from "../components/Diary";
import { DiaryMode } from "../store/slices/diarySlice";

const StyledDiaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://static.waveon.io/img/apps/18146/backgroundTexture.png");
  background-size: cover;
  background-repeat: no-repeat;
`;

const HomePage = () => {
  return (
    <StyledDiaryContainer className="diary_container">
      <Diary mode={DiaryMode.calendar} />
    </StyledDiaryContainer>
  );
};

export default HomePage;
