import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { WalletContext } from "../../context/useWallet";
import ConnectWallet from "../wallet/ConnectWallet";
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
const TitleText = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  width: 245px;
  text-align: center;
  margin: 20px auto;
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
const LoginPage = () => {
  let navigate = useNavigate();
  useEffect(() => {}, []);
  const mainImage = chrome.runtime.getURL("images/main.jpg");
  return (
    <div style={{}}>
      <img src={mainImage} alt="" style={{ width: "100%", height: "444px" }} />
      <MainBody>
        <TitleText>MetaPavo</TitleText>
        <DescText>
          Whether you are visiting Twitter, Opensea or Etherscan, MetaPavo can intelligently
          identify the main entry of the project behind, so that you can view the project background
          in a centralized and immersive way
        </DescText>
      </MainBody>
      <ButtonContainer>
        <ConnectWallet
          loginSuccess={() => {
            navigate("/index");
          }}
        />
      </ButtonContainer>
    </div>
  );
};

export default LoginPage;
