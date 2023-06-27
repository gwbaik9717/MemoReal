import React from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500&display=swap");

  width: 100%;
  height: 100%;

  * {
    font-family: "Baloo Bhaijaan 2", cursive;
    margin: 0px;
    padding: 0px;
  }

  h1 {
    color: red;
  }

  article {
    position: relative;
    perspective: 500px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  article div {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: rgb(247, 214, 0);
    border-radius: 20px;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    perspective-origin: center center;
  }
  article div h1 {
    color: black;
    text-align: center;
    line-height: 99px;
    font-size: 80px;
  }
  article #m_rotate {
    animation: flip 3s ease-in-out infinite;
    transform-origin: top center;
  }
  article #m_fixed {
    background-color: rgb(247, 206, 0);
    animation: fixedd 3s ease-in-out infinite;
  }
  article .clips {
    background-color: black;
    width: 10px;
    height: 10px;
    margin-top: -5px;
    z-index: 2;
  }
  article #clips1 {
    margin-left: 20px;
  }
  article #clips2 {
    margin-left: 70px;
  }

  @keyframes flip {
    0% {
      transform: rotateX(0deg);
    }
    100% {
      transform: rotateX(-360deg);
    }
  }
  @keyframes fixedd {
    0% {
      z-index: 1;
    }
    100% {
      z-index: -1;
    }
  }
`;

const Loader: React.FC = () => {
  return (
    <StyledLoader>
      <article>
        <div id="m_fixed">
          {" "}
          <h1>m</h1>
        </div>
        <div id="m_rotate">
          {" "}
          <h1>m</h1>
        </div>
        <div id="clips1" className="clips"></div>
        <div id="clips2" className="clips"></div>
      </article>
    </StyledLoader>
  );
};

export default Loader;
