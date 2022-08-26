import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ConnectWallet from "./ConnectWallet";

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
    </ThemeProvider>
  </React.StrictMode>,
);

function Root() {
  return <ConnectWallet />;
}
