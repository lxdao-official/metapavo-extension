import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import styled from "styled-components";
import useWallet, { WalletContext } from "../content-script/context/useWallet";
import SingleLoginPage from "./comps/SingleLoginPage";
import toast, { Toaster } from "react-hot-toast";
const rootElement = document.createElement("div");
rootElement.id = "metapavo-login";

document.body.appendChild(rootElement);
document.body.style.margin = "0";

const style = document.createElement("style");
style.innerText = `
@import url('https://rsms.me/inter/inter.css');
#metapavo-login *{
  font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif !important;
}
`;
document.body.appendChild(style);
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
    <RootElement>
      <Root />
      <Toaster />
    </RootElement>
  </React.StrictMode>,
  rootElement,
);
