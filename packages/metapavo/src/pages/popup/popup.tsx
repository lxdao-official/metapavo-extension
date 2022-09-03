import { Box, Tab, Tabs } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
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

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);
document.body.style.margin = "0";
const RootElement = styled.div`
  width: 303px;
  height: 501px;
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
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <MemoryRouter initialEntries={["/index"]}>
        <RootElement>
          <Page />
        </RootElement>
      </MemoryRouter>
    </SnackbarProvider>
  </React.StrictMode>,
);
