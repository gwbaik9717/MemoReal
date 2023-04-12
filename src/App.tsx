import React from "react";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Diary from "./components/Diary";

const GlobalStyle = createGlobalStyle`
  ${reset}
`;

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <Diary />
    </div>
  );
};

export default App;
