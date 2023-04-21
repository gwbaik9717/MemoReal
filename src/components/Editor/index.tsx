import React from "react";
import Page from "../Page";
import Sidebar from "../Sidebar";
import styled from "styled-components";
import HTMLFlipBook from "react-pageflip";

const StyledEditor = styled.div`
  display: flex;
`;

const Editor: React.FC = () => {
  return (
    <StyledEditor>
      {/* @ts-expect-error: 라이브러리 타입 정의 오류 */}
      <HTMLFlipBook
        width={550}
        height={733}
        maxShadowOpacity={0.5}
        usePortrait={false}
      >
        <Page pageNumber={1} />
        <Page pageNumber={2} />
        <Page pageNumber={3} />
        <Page pageNumber={4} />
      </HTMLFlipBook>
      {/* <Page /> */}
      <Sidebar />
    </StyledEditor>
  );
};

export default Editor;
