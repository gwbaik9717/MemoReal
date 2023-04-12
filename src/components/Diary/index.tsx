import React from "react";
import Editor from "../Editor";
import styled from "styled-components";

const StyledDiary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Diary: React.FC = () => {
  return (
    <StyledDiary className="diary">
      <Editor />
    </StyledDiary>
  );
};

export default Diary;
