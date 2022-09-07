import { Box, Tab, Tabs } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import useWallet, { WalletContext } from "../content-script/context/useWallet";
import SingleLoginPage from "./login/SingleLoginPage";

const rootElement = document.createElement("div");
rootElement.id = "metapavo-login";

document.body.appendChild(rootElement);

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
ReactDOM.render(
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
  rootElement,
);
