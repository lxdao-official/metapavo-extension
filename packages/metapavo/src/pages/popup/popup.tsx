import { Box } from "@mui/material";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter, Route, Routes, useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import Bottom from "../content-script/components/main/home/Bottom";
import useWallet, { WalletContext } from "../content-script/context/useWallet";
import HistoryListPage from "../content-script/plugins/watchlist/HistoryListPage";
import WatchListPage from "../content-script/plugins/watchlist/WatchListPage";
import AlarmList from "../content-script/plugins/alarmreminder/AlarmListPage";
import PopupMain from "./PopupMain";
import NoLogin from "./NoLogin";
import { Report } from "../content-script/plugins/Report";
import { Toaster } from "react-hot-toast";
import { HeadCom } from "./styleCom/HeadCom";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);
document.body.style.margin = "0";
const RootElement = styled.div`
  width: 303px;
  height: 580px;
  * {
    box-sizing: border-box;
  }
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
