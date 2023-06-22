import React, { forwardRef } from "react";
import styled from "styled-components";

const StyledLoginPage = styled.div`
  .login_container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .login_wrapper {
    border-radius: 30px;
    position: relative;
    margin-left: auto;
    width: 448px;
    height: 606px;
    background: #ffffff;
    box-shadow: -6px 3px 12px rgba(0, 0, 0, 0.25);
    padding: 138px 57px 71px 57px;
  }

  .login_wrapper .logo {
    position: absolute;
    top: 61px;
    left: 0;
  }

  .login_wrapper h2 {
    text-align: center;
    font-weight: 800;
    font-size: 28px;
    line-height: 32px;
    text-align: center;
  }

  .field {
    width: 100%;
    height: 52px;
    padding: 12px;
    border-bottom: 2px solid #878787;
  }

  .field input {
    width: 100%;
    height: 100%;
  }

  .buttons {
    margin-top: 105px;
  }

  .buttons .button {
    width: 334px;
    height: 50px;
    border-radius: 40px;
    font-weight: 400;
    font-size: 19px;
    line-height: 22px;
  }

  #loginBtn {
    background: #7378e4;
    color: #ffffff;
  }

  #signupBtn {
    background: #efefef;
    margin-top: 7px;
    color: #878787;
  }
`;

const LoginPage = forwardRef(function Page(_, ref: any) {
  return (
    <StyledLoginPage className="diary_page" ref={ref}>
      <div className="login_container">
        <div className="login_wrapper">
          <div className="logo">
            <img
              src="https://static.waveon.io/img/apps/18146/login_logo.png"
              alt="logo"
              width="95px"
              height="87px"
            />
          </div>

          <h2>로그인</h2>
          <form>
            <div className="field ">
              <input type="email" id="email" placeholder="E-mail" required />
            </div>
            <div className="field">
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="buttons">
              <button type="submit" className="button" id="loginBtn">
                로그인
              </button>
              <button type="submit" className="button" id="signupBtn">
                가입하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </StyledLoginPage>
  );
});

export default LoginPage;
