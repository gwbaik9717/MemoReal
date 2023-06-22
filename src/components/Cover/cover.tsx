import React, { forwardRef, useState } from "react";
import styled from "styled-components";

const StyledCoverPage = styled.div`
  background: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CoverPage = forwardRef(function Page(_, ref: any) {
  return (
    <StyledCoverPage className="diary_page" ref={ref} data-density="hard">
      <img
        src="https://static.waveon.io/img/apps/18146/COVER_547_790.png"
        alt="cover"
      />
    </StyledCoverPage>
  );
});

export default CoverPage;
