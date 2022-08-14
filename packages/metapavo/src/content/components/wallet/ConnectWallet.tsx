import React, { useState, useContext, useEffect } from "react";
import { ethers } from "ethers";
import { WalletContext } from "../../context/useWallet";
import createMetaMaskProvider from "metamask-extension-provider";
//@ts-ignore
window.process = {};
const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID;
const NETWORK = CHAIN_ID === "1" ? "mainnet" : "rinkeby";

export default function ConnectWallet(props: any) {
  const [loading, setLoading] = useState(false);
  const { address, setAddress, loginedAddress, setLoginedAddress, fetchLoginInfo } =
    useContext(WalletContext);

  const [visible, setVisible] = useState(false);

  async function signin() {
    const maskProvider = createMetaMaskProvider();
    const addresses = (await maskProvider?.request({
      method: "eth_requestAccounts",
    })) as string[];
    const _address = addresses[0];
    if (_address) {
      setAddress(address);
      const data = await fetch("https://web3helper.herokuapp.com/users/nonce/" + _address, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await data.json();
      const nonce = json.data.nonce;
      const message = json.data.signature_message;
      console.log(_address, nonce, message);

      const signature = (await maskProvider?.request({
        method: "personal_sign",
        params: [_address, message],
      })) as string;
      const data2 = await fetch("https://web3helper.herokuapp.com/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          address: _address,
          signature: signature,
        }),
      });
      const json2 = await data2.json();
      console.log(json2);
      if (json2.success) {
        alert("signin success");
        const access_token = json2.data.access_token;
        chrome.storage.local.set({ access_token: access_token }, function () {});
        fetchLoginInfo();
      }
    }
  }

  //
  return (
    <>
      <button
        onClick={() => {
          signin();
        }}
      >
        Connect Wallet
      </button>
    </>
  );
}
