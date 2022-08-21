import React, { useState } from "react";
import config from "../../config";
import { fetchWrapped } from "../../apis/fetch";

export const WalletContext = React.createContext<{
  address: string;
  setAddress: (address: string) => void;
  loginedAddress: string;
  setLoginedAddress: (loginedAddress: string) => void;
  fetchLoginInfo: () => Promise<string | null>;
}>({} as any);

export default function useWallet() {
  const [address, setAddress] = useState("");
  const [loginedAddress, setLoginedAddress] = useState("");

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

  return {
    address,
    setAddress,
    loginedAddress,
    setLoginedAddress,
    fetchLoginInfo: fetchLoginInfo as any,
  };
}
