import React, { useState } from "react";
import config from "../../../config";
import { fetchWrapped } from "../../../utils/apis/fetch";
import createMetaMaskProvider from "metamask-extension-provider";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
export const WalletContext = React.createContext<{
  address: string;
  maskProvider: any;
  setAddress: (address: string) => void;
  loginedAddress: string;
  setLoginedAddress: (loginedAddress: string) => void;
  fetchLoginInfo: () => Promise<string | null>;
  signinWithMetamask: () => Promise<string>;
  signinWithWalletConnect: () => Promise<string>;
  logout: () => Promise<void>;
}>({} as any);
const connector = new WalletConnect({
  bridge: "https://bridge.walletconnect.org", // Required
  qrcodeModal: QRCodeModal,
});

export default function useWallet() {
  const [address, setAddress] = useState("");
  const [loginedAddress, setLoginedAddress] = useState("");
  const maskProvider = createMetaMaskProvider();
  maskProvider.key = "metapavo";
  const getNonce = async (_address: string) => {
    const data = await fetch(config.baseURL + "/users/nonce/" + _address, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await data.json();
    const message = json.data.signature_message;
    return message;
  };
  const signIn: (_address: string, _signature: string) => Promise<string> = (
    _address: string,
    _signature: string,
  ) => {
    return new Promise(async (resolve, reject) => {
      const data2 = await fetch(config.baseURL + "/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          address: _address,
          signature: _signature,
        }),
      });
      const json2 = await data2.json();
      if (json2.success) {
        const access_token = json2.data.access_token;
        chrome.storage.local.set({ access_token: access_token }, function () {});
        fetchLoginInfo();
        resolve(access_token);
      } else {
        reject(new Error("login fail"));
      }
    });
  };

  const signinWithWalletConnect: () => Promise<string> = () => {
    return new Promise(async (resolve, reject) => {
      console.log("connector.connected", connector.connected);
      if (!connector.connected) {
        // create new session
        connector.createSession();
      } else {
        await connector.killSession();
        connector.createSession();
      }

      connector.on("connect", async (error, payload) => {
        // Get provided accounts and chainId
        const { accounts } = payload.params[0];
        if (accounts.length) {
          const _address = accounts[0];
          setAddress(_address);
          const message = await getNonce(_address);
          const msgParams = [
            message, // Required
            _address, // Required
          ];
          connector
            .signPersonalMessage(msgParams)
            .then(async (signature) => {
              // Returns signature.
              console.log(signature);
              const access_token = await signIn(_address, signature);
              resolve(access_token);
            })
            .catch((error) => {
              // Error returned when rejected
              reject(error);
            });
        } else {
          reject(new Error("connect empty address"));
        }
      });
      connector.on("disconnect", async () => {
        // Delete connector
        reject(new Error("disconnect"));
      });
    });
  };
  const checkMetaMaskValid: () => Promise<boolean> = () => {
    return new Promise(async (resolve) => {
      console.log("maskProvider", maskProvider);
      maskProvider.on("error", () => {
        console.log("maskProvider error");
        resolve(false);
      });
    });
  };
  const signinWithMetamask: () => Promise<string> = () => {
    return new Promise(async (resolve, reject) => {
      let addresses: string[] = [];
      console.log("maskProvider", maskProvider);
      maskProvider.on("error", () => {
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
        const message = await getNonce(_address);

        const signature = (await maskProvider?.request({
          method: "personal_sign",
          params: [_address, message],
        })) as string;
        const access_token = await signIn(_address, signature);
        resolve(access_token);
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
    signinWithMetamask,
    signinWithWalletConnect,
    logout,
    checkMetaMaskValid,
    maskProvider,
  };
}
