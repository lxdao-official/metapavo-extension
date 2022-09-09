import { Box, IconButton, Tab, Tabs } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Bottom from "../content-script/components/main/home/Bottom";
import useWallet, { WalletContext } from "../content-script/context/useWallet";
import HistoryListPage from "../content-script/plugins/watchlist/HistoryListPage";
import WatchListPage from "../content-script/plugins/watchlist/WatchListPage";
import AlarmList from "../content-script/plugins/alarmreminder/AlarmListPage";
import FavList from "./favList";
import PopupMain from "./index";
import NoLogin from "./NoLogin";
import { Report } from "../content-script/plugins/Report";
import { Head, HeadLogo, HeadSelect, ModalBG, ModalContainer } from "./styleCom";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import copy from "clipboard-copy";
import ClearIcon from "@mui/icons-material/Clear";
import toast, { Toaster } from "react-hot-toast";
const arrow_down = chrome.runtime.getURL("images/svgs/arrow_down.svg");
const index_logo = chrome.runtime.getURL("images/index-logo.png");
const returnImg = chrome.runtime.getURL("images/svgs/return.svg");

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);
// const root = ReactDOM.createRoot(rootElement as HTMLElement);
document.body.style.margin = "0";
const RootElement = styled.div`
  width: 303px;
  height: 580px;
  * {
    box-sizing: border-box;
  }
`;
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: "10px 0" }}
    >
      {value === index && <>{children}</>}
    </div>
  );
}
// 头部组件
const HeadCom = (props: any) => {
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
function Page() {
  const wallet = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!wallet.loginedAddress) {
        try {
          const address = await wallet.fetchLoginInfo();
          if (!address) {
            navigate("/login");
          }
        } catch (e) {
          navigate("/login");
        }
      }
    })();
  }, []);
  return (
    <WalletContext.Provider value={wallet}>
      <HeadCom />
      <Box sx={{ width: "100%" }}>
        <Routes>
          <Route path="/login" element={<NoLogin />}></Route>
          <Route path="/index" element={<PopupMain />} />
          <Route path="/watchlist" element={<WatchListPage />} />
          <Route path="/history" element={<HistoryListPage />} />
          <Route path="/alarms" element={<AlarmList />} />
          <Route path="/report" element={<Report />} />
          {/* <Route path="/alarms" element={<AlarmListPage />} /> */}
        </Routes>
      </Box>
      <Bottom />
    </WalletContext.Provider>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter initialEntries={["/index"]}>
      <RootElement>
        <Page />
      </RootElement>
    </MemoryRouter>
    <Toaster />
  </React.StrictMode>,
  rootElement,
);
