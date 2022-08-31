import { Box, Tab, Tabs } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useWallet, { WalletContext } from "../content-script/context/useWallet";
import AlarmList from "./alarmList";
import FavList from "./favList";
import NoLogin from "./NoLogin";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-popop";

document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const RootElement = styled.div`
  width: 400px;
  height: 400px;
  padding: 10px;
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
  const [value, setValue] = React.useState(0);
  const wallet = useWallet();
  const navigate = useNavigate();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        {wallet.loginedAddress ? (
          <>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Alarm List" />
                <Tab label="Watch List" />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {value === 0 ? <AlarmList /> : null}
            </TabPanel>
            <TabPanel value={value} index={1}>
              {value === 1 ? <FavList /> : null}
            </TabPanel>
          </>
        ) : null}
      </Box>
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
          <Routes>
            <Route path="/login" element={<NoLogin />}></Route>
            <Route path="/index" element={<Page />} />
            {/* <Route path="/alarms" element={<AlarmListPage />} /> */}
          </Routes>
        </RootElement>
      </MemoryRouter>
    </SnackbarProvider>
  </React.StrictMode>,
);
