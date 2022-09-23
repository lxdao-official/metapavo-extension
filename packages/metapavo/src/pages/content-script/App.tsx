import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import Ball from "./components/pavo-ball/ball";
import SelectText from "../plugins/date-tool/selectText";
import useGlobal, { GlobalContext } from "./context/useGlobal";
import useWallet, { WalletContext } from "./context/useWallet";
import Main from "./components/side-panel";
import toast, { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material";
const rootElement = document.createElement("div");
rootElement.id = "metapavo-root";
Object.assign(rootElement.style, {
  position: "absolute",
  width: 0,
  height: 0,
  right: 0,
  bottom: 0,
  zIndex: 100000000000,
});
document.body.appendChild(rootElement);
const style = document.createElement("style");
style.innerText = `
@import url('https://rsms.me/inter/inter.css');
#metapavo-root *{
  font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
}
`;

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          // overrides tooltip
        },
        popper: {
          // overrides the popper
          zIndex: 7000000000000000 + "!important",
        },
      },
    },
  },
});
document.body.appendChild(style);

function Root() {
  const useG = useGlobal();
  const wallet = useWallet();

  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={useG}>
        <WalletContext.Provider value={wallet}>
          <Ball />
          {useG.showMain ? <Main /> : null}
          <SelectText />
        </WalletContext.Provider>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <MemoryRouter initialEntries={["/index"]}>
      <Root />
    </MemoryRouter>
    <Toaster containerStyle={{ zIndex: 1000000000000 }} />
  </React.StrictMode>,
  rootElement,
);
