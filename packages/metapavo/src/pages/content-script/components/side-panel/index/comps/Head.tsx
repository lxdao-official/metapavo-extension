import { IconButton } from "@mui/material";
import { useState, useContext } from "react";
import { GlobalContext } from "../../../../context/useGlobal";
import { WalletContext } from "../../../../context/useWallet";
import { Head, HeadSelect, HeadLogo, ModalBG, ModalContainer } from "../styles";
import toast from "react-hot-toast";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import ClearIcon from "@mui/icons-material/Clear";
const arrow_down = chrome.runtime.getURL("images/svgs/arrow_down.svg");
const index_logo = chrome.runtime.getURL("images/index-logo.png");

function formatAddress(address: string) {
  // ens
  if (address.includes(".")) {
    return address;
  }
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
}
// 头部组件
export const HeadCom = (props: any) => {
  const [selectMenu, setSelectMenu] = useState<boolean>(false);
  const { setShowLogin } = useContext(GlobalContext);
  const { loginedAddress, logout } = useContext(WalletContext);

  const copyContractAddress = () => {
    copy(loginedAddress);
    toast.success("Copied");
  };
  const LoginModal = (props: any) => {
    return (
      <>
        <ModalBG
          onClick={() => {
            setSelectMenu(false);
          }}
        ></ModalBG>
        <ModalContainer>
          <div className="user-des">
            <div className="user-topLine">
              <div className="user-name">
                <span className="user-code">{formatAddress(loginedAddress)}</span>
                <IconButton
                  onClick={() => {
                    copyContractAddress();
                  }}
                  sx={{ ml: 0.5, height: "17px", width: "17px" }}
                >
                  <ContentCopyIcon sx={{ ml: 0.5, height: "17px", width: "17px" }} />
                </IconButton>
              </div>
              {/* <div className="user-eth">Value: 1213.22 USDC</div> */}
            </div>
            <ClearIcon
              sx={{ height: "24px", width: "24px", color: "#D1D0D6", cursor: "pointer" }}
              onClick={() => setSelectMenu(!selectMenu)}
            />
          </div>
          <div className="op-list">
            {/* <div className="metaPavo-pp">系统设置</div> */}
            <div
              className="metaPavo-pp"
              onClick={async () => {
                await logout();
                setShowLogin(true);
              }}
            >
              Logout
            </div>
          </div>
          <div className="mask" />
        </ModalContainer>
      </>
    );
  };

  return (
    <Head>
      <HeadSelect onClick={() => setSelectMenu(!selectMenu)}>
        <span>{formatAddress(loginedAddress)}</span>
        <img src={arrow_down} alt="" />
      </HeadSelect>

      <HeadLogo>
        <img className="logo" src={index_logo} alt="" />
      </HeadLogo>
      {selectMenu && <LoginModal />}
    </Head>
  );
};
