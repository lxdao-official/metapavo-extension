import { useEffect } from "react";
import styled from "styled-components";
import ConnectWallet from "./ConnectWallet";
const Page = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const index_logo = chrome.runtime.getURL("images/index-logo.png");
const Banner = styled.img``;
const MainBody = styled.div`
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 379px;
  margin: 0 auto;
`;
const DescText = styled.div`
  width: 379px;
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
const ButtonContainer = styled.div`
      display: flex;
    flex-direction: column;
    align-items: center;
    margin-top:110px;
}
`;

const SingleLoginPage = () => {
  useEffect(() => {}, []);
  const mainImage = chrome.runtime.getURL("images/login-banner.png");
  return (
    <Page>
      <Banner src={mainImage} alt="" style={{ width: "auto", height: "100vh" }} />
      <div style={{ flex: 1, alignItems: "center", display: "flex" }}>
        <MainBody>
          <TitleText>
            <img className="logo" src={index_logo} alt="" />
          </TitleText>
          <DescText>
            Whether you are visiting Twitter, Opensea or Etherscan, MetaPavo can intelligently
            identify the main entry of the project behind, so that you can view the project
            background in a centralized and immersive way
          </DescText>
          <ButtonContainer>
            <ConnectWallet
              loginSuccess={() => {
                setTimeout(() => window.close(), 2000);
              }}
            />
          </ButtonContainer>
        </MainBody>
      </div>
    </Page>
  );
};

export default SingleLoginPage;
