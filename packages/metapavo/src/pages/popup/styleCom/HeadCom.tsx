import { IconButton } from "@mui/material";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WalletContext } from "../../content-script/context/useWallet";
import { Head, HeadLogo, HeadSelect, ModalBG, ModalContainer } from ".";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import ClearIcon from "@mui/icons-material/Clear";
import toast, { Toaster } from "react-hot-toast";
const arrow_down = chrome.runtime.getURL("images/svgs/arrow_down.svg");
const index_logo = chrome.runtime.getURL("images/index-logo.png");
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");
// 头部组件
export const HeadCom = (props: any) => {
  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);

  const { loginedAddress, logout } = useContext(WalletContext);

  function formatAddress(address: string) {
    // ens
    if (address.includes(".")) {
      return address;
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  const copyContractAddress = () => {
    copy(loginedAddress);
    toast.success("Copied");
  };
  const navigate = useNavigate();
  const UserInfoModal = (props: any) => {
    return (
      <>
        <ModalBG
          onClick={() => {
            setShowUserInfoModal(false);
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
              onClick={() => setShowUserInfoModal(!showUserInfoModal)}
            />
          </div>
          <div className="op-list">
            {/* <div className="metaPavo-pp">系统设置</div> */}
            <div
              className="metaPavo-pp"
              onClick={async () => {
                setShowUserInfoModal(false);
                await logout();
                navigate("/login");
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
      <HeadLogo>
        <img className="logo" src={index_logo} alt="" />
      </HeadLogo>
      <HeadSelect onClick={() => setShowUserInfoModal(!showUserInfoModal)}>
        <span>{loginedAddress ? formatAddress(loginedAddress) : ""}</span>
        <img src={arrow_down} alt="" />
      </HeadSelect>
      {showUserInfoModal && <UserInfoModal />}
    </Head>
  );
};
