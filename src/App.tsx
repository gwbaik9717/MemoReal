import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Diary from "./components/Diary";

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }

  button, input{
    border: none;
    outline: none;
    background: none;
    padding: 0;
  }

  textarea:focus,
  input:focus {
    outline: none;
  }
`;

const StyledDiaryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("https://static.waveon.io/img/apps/18146/backgroundTexture.png");
  background-size: cover;
  background-repeat: no-repeat;
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
