import { useState, useContext, useEffect } from "react";
import { Box, CircularProgress, IconButton } from "@mui/material";
import {
  Container,
  HeadSelect,
  HeadLogo,
  Head,
  ModalContainer,
  ModalBG,
  MenuListStyle,
  MenuItemStyle,
  Badge,
  Version,
} from "./styleCom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import ClearIcon from "@mui/icons-material/Clear";
import moment from "moment";
import { useNavigate } from "react-router";
import { useSnackbar } from "notistack";
import styled from "styled-components";
import { WalletContext } from "../content-script/context/useWallet";
import { settingCounts } from "../../utils/apis/nft_api";
const arrow_down = chrome.runtime.getURL("images/svgs/arrow_down.svg");
const index_logo = chrome.runtime.getURL("images/index-logo.png");
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");
const manifestData = chrome.runtime.getManifest();

const PopupMain = () => {
  const [showUserInfoModal, setShowUserInfoModal] = useState<boolean>(false);

  const { loginedAddress, logout } = useContext(WalletContext);

  const [counts, setCounts] = useState<{
    favCount: number;
    alarmCount: number;
    historyCount: number;
  }>({
    favCount: 0,
    alarmCount: 0,
    historyCount: 0,
  });

  const navigate = useNavigate();

  function formatAddress(address: string) {
    // ens
    if (address.includes(".")) {
      return address;
    }
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }
  // 头部组件
  const HeadCom = (props: any) => {
    return (
      <Head>
        <HeadLogo>
          <img className="logo" src={index_logo} alt="" />
        </HeadLogo>
        <HeadSelect onClick={() => setShowUserInfoModal(!showUserInfoModal)}>
          <span>{loginedAddress ? formatAddress(loginedAddress) : ""}</span>
          <img src={arrow_down} alt="" />
        </HeadSelect>
      </Head>
    );
  };

  const { enqueueSnackbar } = useSnackbar();
  const copyContractAddress = () => {
    copy(loginedAddress);
    enqueueSnackbar("Copied", {});
  };
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
                await logout();
                navigate("/login");
              }}
            >
              退出登录
            </div>
          </div>
          <div className="mask" />
        </ModalContainer>
      </>
    );
  };
  const GoIcon = () => (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.66666 11.8333L11.3333 5.16663"
        stroke="#D1D0D6"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.66666 5.16663H11.3333V11.8333"
        stroke="#D1D0D6"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const MenuList = (props: any) => {
    return (
      <MenuListStyle>
        <MenuItemStyle
          onClick={() => {
            navigate("/watchlist");
          }}
        >
          <div className="menu-left">WatchList</div>
          <div className="menu-right">
            {counts.favCount ? <Badge>{counts.favCount}</Badge> : null}
            <GoIcon />
          </div>
        </MenuItemStyle>
        <MenuItemStyle
          onClick={() => {
            navigate("/history");
          }}
        >
          <div className="menu-left">History</div>
          <div className="menu-right">
            {counts.historyCount ? <Badge>{counts.historyCount}</Badge> : null}
            <GoIcon />
          </div>
        </MenuItemStyle>
        <MenuItemStyle
          onClick={() => {
            navigate("/alarms");
          }}
        >
          <div className="menu-left">AlarmReminder</div>
          <div className="menu-right">
            {counts.alarmCount ? <Badge>{counts.alarmCount}</Badge> : null}
            <GoIcon />
          </div>
        </MenuItemStyle>
        <MenuItemStyle>
          <div className="menu-left">Timezone Tool</div>
          <div className="menu-right">
            <GoIcon />
          </div>
        </MenuItemStyle>
        <MenuItemStyle
          onClick={() => {
            chrome.tabs.create({
              url: "https://lxdao.io",
            });
          }}
        >
          <div className="menu-left">About LXDAO</div>
          <div className="menu-right">
            <GoIcon />
          </div>
        </MenuItemStyle>
      </MenuListStyle>
    );
  };
  const getCounts = async () => {
    const _data = await settingCounts();
    if (_data) {
      setCounts(_data);
    }
  };
  useEffect(() => {
    console.log("init");
    getCounts();
  }, []);

  return (
    <Container>
      <HeadCom />
      <MenuList />
      <Version>version: v{manifestData.version}</Version>
      {showUserInfoModal && <UserInfoModal />}
    </Container>
  );
};

export default PopupMain;
