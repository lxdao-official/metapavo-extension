import React, { useState } from "react";
import config from "../../config";
import { fetchWrapped } from "../../apis/fetch";
import createMetaMaskProvider from "metamask-extension-provider";

export const WalletContext = React.createContext<{
  address: string;
  setAddress: (address: string) => void;
  loginedAddress: string;
  setLoginedAddress: (loginedAddress: string) => void;
  fetchLoginInfo: () => Promise<string | null>;
  signin: () => Promise<string>;
  logout: () => Promise<void>;
}>({} as any);

export default function useWallet() {
  const [address, setAddress] = useState("");
  const [loginedAddress, setLoginedAddress] = useState("");
  const signin: () => Promise<string> = () => {
    return new Promise(async (resolve, reject) => {
      let addresses: string[] = [];
      const maskProvider = createMetaMaskProvider();
      console.log("maskProvider", maskProvider);
      maskProvider.on("error", (error) => {
        reject(new Error("metamask connect error"));
        // Failed to connect to MetaMask, fallback logic.
      });
      try {
        addresses = (await maskProvider?.request({
          method: "eth_requestAccounts",
        })) as string[];
      } catch (e: any) {
        reject(e);
      }

      const _address = addresses[0];
      if (_address) {
        setAddress(address);
        const data = await fetch(config.baseURL + "/users/nonce/" + _address, {
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
        const data2 = await fetch(config.baseURL + "/auth/signin", {
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
          const access_token = json2.data.access_token;
          chrome.storage.local.set({ access_token: access_token }, function () {});
          fetchLoginInfo();
          resolve(access_token);
        } else {
          reject(new Error("login fail"));
        }
      } else {
        reject(new Error("connect empty address"));
      }
    });
  };
  async function fetchLoginInfo() {
    return new Promise((resolve, reject) => {
      fetchWrapped(config.baseURL + "/users/me", {
        method: "GET",
      })
        .then((json) => {
          if (json?.data?.address) {
            setLoginedAddress(json.data.address);
            resolve(json.data.address);
          } else {
            reject();
          }
        })
        .catch(reject);
    });
  }

  async function logout() {
    chrome.storage.local.set({ access_token: "" }, function () {});
  }

  return {
    address,
    setAddress,
    loginedAddress,
    setLoginedAddress,
    fetchLoginInfo: fetchLoginInfo as any,
    signin,
    logout,
  };
}
