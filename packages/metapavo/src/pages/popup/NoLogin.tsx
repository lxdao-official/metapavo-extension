import { useEffect } from "react";
import styled from "styled-components";
const index_logo = chrome.runtime.getURL("images/index-logo.png");
const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const MainBody = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 276.57px;
  margin: 0 auto;
`;
const DescText = styled.div`
  width: 276.57px;
  margin: 10px auto;

  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  /* or 142% */

  display: flex;
  align-items: flex-end;
  text-align: center;

  color: #9e9aaf;
`;

const ButtonContainer = styled.div`
      display: flex;
    flex-direction: column;
    align-items: center;
}
`;
const ButtonStyle = styled.button`
  margin-top: 50px;
  padding: 0 20px;
  width: 276.57px;
  height: 48px;
  background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 4px;
  color: #fff !important;
  font-size: 14px !important;
  border: none !important;
  cursor: pointer;
  margin: 0 auto;
  border: 3px solid linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
  background: linear-gradient(
    91.75deg,
    rgba(125, 226, 172, 0.1) 0%,
    rgba(56, 157, 250, 0.1) 49.26%,
    rgba(159, 80, 255, 0.1) 97.76%
  );
  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 4px;
  color: #1c1b1d !important;
  &:disabled {
    opacity: 0.6;
  }
`;
const TitleText = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  width: 379px;
  text-align: center;
  margin: 20px auto;
  display: flex;
  width: 263px;
  margin: 35.5px auto 34.8px auto;
  align-items: center;

  .logo {
    width: 263px;
  }
`;
const NoLogin = () => {
  useEffect(() => {}, []);
  return (
    <Page>
      <div style={{ flex: 1, alignItems: "center", display: "flex" }}>
        <MainBody>
          <TitleText>
            <img className="logo" src={index_logo} alt="" />
          </TitleText>
          <DescText>Not login, you can click the button to open login page~</DescText>
          <ButtonContainer>
            <ButtonStyle
              onClick={() => {
                chrome.tabs.create({ url: "login.html" });
              }}
            >
              Login
            </ButtonStyle>
          </ButtonContainer>
        </MainBody>
      </div>
    </Page>
  );
};

export default NoLogin;
