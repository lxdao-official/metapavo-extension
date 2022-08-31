import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../../context/useGlobal";
const index_logo = chrome.runtime.getURL("images/index-logo.png");
// import createMetaMaskProvider from "metamask-extension-provider";

// chrome APIを使用するためdynamic importし、browser側でのみ読み込まれるようにする
// const Button = dynamic(
//   async () => {
//     const module = await import("src/components/Button");
//     return module.Button;
//   },
//   {
//     ssr: false,
//     loading: () => {
//       return <div className="w-10 h-4 bg-gray-100 rounded border animate-pulse"></div>;
//     },
//   },
// );
const MainBody = styled.div`
  margin-top: 50px;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 170px;
  width: 100%;
  left: 0;
`;
const DescText = styled.div`
  width: 245px;
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
    position: absolute;
    bottom: 80px;
    width: 100%;
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
  width: 200px;
  margin: 15.5px auto 14.8px auto;
  align-items: center;

  .logo {
    width: 200px;
  }
`;
const LoginPage = () => {
  const useG = useContext(GlobalContext);
  useEffect(() => {}, []);
  const mainImage = chrome.runtime.getURL("images/main.jpg");
  return (
    <div style={{}}>
      <img src={mainImage} alt="" style={{ width: "100%", height: "444px" }} />
      <MainBody>
        <TitleText>
          <img className="logo" src={index_logo} alt="" />
        </TitleText>
        <DescText>
          Whether you are visiting Twitter, Opensea or Etherscan, MetaPavo can intelligently
          identify the main entry of the project behind, so that you can view the project background
          in a centralized and immersive way
        </DescText>
      </MainBody>
      <ButtonContainer>
        <ButtonStyle
          onClick={() => {
            chrome.runtime.sendMessage({ cmd: "open_login" });
            useG.setShowMain(false);
          }}
        >
          Login
        </ButtonStyle>
      </ButtonContainer>
    </div>
  );
};

export default LoginPage;
