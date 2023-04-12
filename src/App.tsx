import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Diary from "./components/Diary";

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const StyledDiaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <StyledDiaryContainer className="diary_container">
        <Diary />
      </StyledDiaryContainer>
    </div>
  );
};

export default App;
