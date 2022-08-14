import React, { useState } from "react";

export const WalletContext = React.createContext<{
  address: string;
  setAddress: (address: string) => void;
  loginedAddress: string;
  setLoginedAddress: (loginedAddress: string) => void;
  fetchLoginInfo: () => void;
}>({
  address: "",
  setAddress: () => {},
  loginedAddress: "",
  setLoginedAddress: () => {},
  fetchLoginInfo: () => {},
});

export default function useWallet() {
  const [address, setAddress] = useState("");
  const [loginedAddress, setLoginedAddress] = useState("");

  function fetchLoginInfo() {
    chrome.storage.local.get(["access_token"], function (data) {
      const access_token = data.access_token;
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
            setLoginedAddress(json.data.address);
          });
      }
    });
  }

  return {
    address,
    setAddress,
    loginedAddress,
    setLoginedAddress,
    fetchLoginInfo,
  };
}
