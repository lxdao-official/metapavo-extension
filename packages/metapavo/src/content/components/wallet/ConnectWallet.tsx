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
  const { address, fullAddress, setAddress, setFullAddress } = useContext(WalletContext);

  const [visible, setVisible] = useState(false);

  async function signin() {
    const maskProvider = createMetaMaskProvider();
    const addresses = (await maskProvider?.request({
      method: "eth_requestAccounts",
    })) as string[];
    const address = addresses[0];
    const data = await fetch("https://web3helper.herokuapp.com/users/nonce/" + address, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await data.json();
    const nonce = json.data.nonce;
    const message = json.data.signature_message;
    console.log(address, nonce, message);

    const signature = (await maskProvider?.request({
      method: "personal_sign",
      params: [address, message],
    })) as string;
    const data2 = await fetch("https://web3helper.herokuapp.com/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        address: address,
        signature: signature,
      }),
    });
    const json2 = await data2.json();
    console.log(json2);
    if (json2.success) {
      alert("signin success");
      const access_token = json2.data.access_token;
      localStorage.setItem("access_token", access_token);
      getUserInfo();
    }
  }

  function getUserInfo() {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      fetch("https://web3helper.herokuapp.com/users/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + access_token,
        },
      })
        .then((data) => data.json())
        .then((json) => {
          console.log(json);
        });
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
