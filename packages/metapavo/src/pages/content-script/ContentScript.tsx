import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import App from "./components/circle/circle";
import SelectText from "./plugins/date-tool/selectText";
import { SnackbarProvider } from "notistack";
import useGlobal, { GlobalContext } from "./context/global";
import useWallet, { WalletContext } from "./context/useWallet";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

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
const root = ReactDOM.createRoot(rootElement as HTMLElement);

function Root() {
  const useG = useGlobal();
  const wallet = useWallet();

  return (
    <GlobalContext.Provider value={useG}>
      <WalletContext.Provider value={wallet}>
        <App />
      </WalletContext.Provider>
    </GlobalContext.Provider>
  );
}
root.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={lightTheme}>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <MemoryRouter initialEntries={["/index"]}>
          <Root />
        </MemoryRouter>
      </SnackbarProvider>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SelectText />
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
