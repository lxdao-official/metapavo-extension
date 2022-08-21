import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../../context/useWallet";
import createMetaMaskProvider from "metamask-extension-provider";
import styled from "styled-components";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

import config from "../../../config";
//@ts-ignore
window.process = {};
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const NETWORK = CHAIN_ID === "1" ? "mainnet" : "rinkeby";

const ButtonStyle = styled.button`
  width: 202px;
  height: 37px;
  background: linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%);
  box-shadow: 0px 0px 0px #4216e7;
  border-radius: 4px;
  color: #fff !important;
  font-size: 14px !important;
  border: none !important;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
  }
`;
export default function ConnectWallet(props: { loginSuccess?: (access_token: string) => void }) {
  const { address, setAddress, loginedAddress, setLoginedAddress, fetchLoginInfo, signin } =
    useContext(WalletContext);
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  async function login() {
    try {
      setLoading(true);
      const access_token = await signin();
      props.loginSuccess && props.loginSuccess(access_token);
      enqueueSnackbar("login success");
    } catch (e: any) {
      enqueueSnackbar("login fail: " + e.message);
    }
    setLoading(false);
  }
  return (
    <>
      <ButtonStyle
        onClick={() => {
          login();
        }}
        disabled={loading}
      >
        {loading ? "Connecting..." : "Connect Wallet"}
      </ButtonStyle>
    </>
  );
}
