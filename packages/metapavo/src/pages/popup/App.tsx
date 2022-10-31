import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route, Routes, useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import Bottom from "../content-script/components/side-panel/accordion/Bottom";
import useWallet, { WalletContext } from "../content-script/context/useWallet";
import HistoryListPage from "../plugins/history/HistoryListPage";
import WatchListPage from "../plugins/watchlist/WatchListPage";
import PopupMain from "./PopupMain";
import NoLogin from "./NoLogin";
import { Report } from "../plugins/report/ReportProject";
import { Toaster } from "react-hot-toast";
import { HeadCom } from "./styleCom/HeadCom";
import { ReportScam } from "../plugins/report/ReportScam";
import MyNftsListPage from "../plugins/mynfts/MyNftsListPage";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);

const style = document.createElement("style");
style.innerText = `
@import url('https://rsms.me/inter/inter.css');
#metapavo-popop *{
  font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
}
`;
document.body.appendChild(style);
document.body.style.margin = "0";
const RootElement = styled.div`
  width: 303px;
  height: 545px;
  * {
    box-sizing: border-box;
  }
  *::-webkit-scrollbar {
    width: 0;
  }
  ::-webkit-scrollbar {
    width: 0;
  }
`;
const HavNavPage = styled.div`
  margin-top: 53px;
`;
function Page() {
  const wallet = useWallet();
  const navigate = useNavigate();
  let match = useMatch("/login");
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
      {match ? null : <HeadCom />}
      <Box sx={{ width: "100%", height: "100%", overflow: "auto" }}>
        <Routes>
          <Route path="/login" element={<NoLogin />}></Route>
          <Route
            path="/index"
            element={
              <HavNavPage>
                <PopupMain />
              </HavNavPage>
            }
          />
          <Route
            path="/watchlist"
            element={
              <HavNavPage>
                <WatchListPage />
              </HavNavPage>
            }
          />
          <Route
            path="/history"
            element={
              <HavNavPage>
                <HistoryListPage />
              </HavNavPage>
            }
          />

          <Route
            path="/report"
            element={
              <HavNavPage>
                <Report />
              </HavNavPage>
            }
          />
          <Route
            path="/report-scam"
            element={
              <HavNavPage>
                <ReportScam />
              </HavNavPage>
            }
          />
          <Route
            path="/mynfts"
            element={
              <HavNavPage>
                <MyNftsListPage />
              </HavNavPage>
            }
          />
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
