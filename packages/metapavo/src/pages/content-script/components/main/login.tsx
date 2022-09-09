import { useContext, useEffect } from "react";
import styled from "styled-components";
import { GlobalContext } from "../../context/useGlobal";
const index_logo = chrome.runtime.getURL("images/index-logo.png");
const MainBody = styled.div`
  margin-top: 50px;
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 220px;
  width: 100%;
  left: 0;
`;
const DescText = styled.div`
  width: 255px;
  margin: 30px auto;

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
    bottom: 120px;
    width: 100%;
    flex-direction: column;
    align-items: center;
}
`;

const ButtonStyle = styled.button`
  padding: 0 20px;
  height: 37px;
  width: 198px;
  background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 4px;
  color: #fff !important;
  font-size: 14px !important;
  border: none !important;
  cursor: pointer;
  margin: 0 auto;
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
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ verticalAlign: "-3px", marginRight: "5px" }}
          >
            <path
              d="M12.6667 5.16667H12V4.5C12 3.96957 11.7893 3.46086 11.4142 3.08579C11.0391 2.71071 10.5304 2.5 10 2.5H3.33333C2.8029 2.5 2.29419 2.71071 1.91912 3.08579C1.54405 3.46086 1.33333 3.96957 1.33333 4.5V12.5C1.33333 13.0304 1.54405 13.5391 1.91912 13.9142C2.29419 14.2893 2.8029 14.5 3.33333 14.5H12.6667C13.1971 14.5 13.7058 14.2893 14.0809 13.9142C14.456 13.5391 14.6667 13.0304 14.6667 12.5V7.16667C14.6667 6.63623 14.456 6.12753 14.0809 5.75245C13.7058 5.37738 13.1971 5.16667 12.6667 5.16667ZM3.33333 3.83333H10C10.1768 3.83333 10.3464 3.90357 10.4714 4.0286C10.5964 4.15362 10.6667 4.32319 10.6667 4.5V5.16667H3.33333C3.15652 5.16667 2.98695 5.09643 2.86193 4.9714C2.7369 4.84638 2.66667 4.67681 2.66667 4.5C2.66667 4.32319 2.7369 4.15362 2.86193 4.0286C2.98695 3.90357 3.15652 3.83333 3.33333 3.83333ZM13.3333 10.5H12.6667C12.4899 10.5 12.3203 10.4298 12.1953 10.3047C12.0702 10.1797 12 10.0101 12 9.83333C12 9.65652 12.0702 9.48695 12.1953 9.36193C12.3203 9.23691 12.4899 9.16667 12.6667 9.16667H13.3333V10.5ZM13.3333 7.83333H12.6667C12.1362 7.83333 11.6275 8.04405 11.2525 8.41912C10.8774 8.79419 10.6667 9.3029 10.6667 9.83333C10.6667 10.3638 10.8774 10.8725 11.2525 11.2475C11.6275 11.6226 12.1362 11.8333 12.6667 11.8333H13.3333V12.5C13.3333 12.6768 13.2631 12.8464 13.1381 12.9714C13.013 13.0964 12.8435 13.1667 12.6667 13.1667H3.33333C3.15652 13.1667 2.98695 13.0964 2.86193 12.9714C2.7369 12.8464 2.66667 12.6768 2.66667 12.5V6.38667C2.88084 6.46201 3.10629 6.50034 3.33333 6.5H12.6667C12.8435 6.5 13.013 6.57024 13.1381 6.69526C13.2631 6.82029 13.3333 6.98986 13.3333 7.16667V7.83333Z"
              fill="white"
            />
          </svg>
          Connect Wallet
        </ButtonStyle>
      </ButtonContainer>
    </div>
  );
};

export default LoginPage;
