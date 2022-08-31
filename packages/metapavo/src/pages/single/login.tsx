import { Box, Tab, Tabs } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import useWallet, { WalletContext } from "../content-script/context/useWallet";
import SingleLoginPage from "./login/SingleLoginPage";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-login";

document.body.appendChild(rootElement);
const root = ReactDOM.createRoot(rootElement as HTMLElement);

const RootElement = styled.div`
  width: 100%;
`;

function Root() {
  const wallet = useWallet();

  return (
    <WalletContext.Provider value={wallet}>
      <SingleLoginPage />
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
      <RootElement>
        <Root />
      </RootElement>
    </SnackbarProvider>
  </React.StrictMode>,
);
