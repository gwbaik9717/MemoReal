import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import AppRouter from "./components/AppRouter";

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

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <AppRouter />
    </>
  );
};

export default App;
