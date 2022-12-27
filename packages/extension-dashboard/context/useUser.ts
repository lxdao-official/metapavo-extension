import { users } from 'extension-common/src/apis';
import { me } from 'extension-common/src/apis/users_api';
import React, { useState } from 'react';

export const UserContext = React.createContext<{
  loginedAddress: string;
  user: users | null;
  token: string | null;
  setLoginedAddress: (loginedAddress: string) => void;
  fetchLoginInfo: () => Promise<string | null>;
  logout: () => Promise<void>;
}>({} as any);

export default function useUser() {
  const [loginedAddress, setLoginedAddress] = useState('');
  const [user, setUser] = useState<users | null>(null);
  const [token, setToken] = useState<string | null>(null);
  async function fetchLoginInfo() {
    chrome.storage.local.get(['access_token'], function (data) {
      if (data && data.access_token) {
        setToken(data.access_token);
      }
    });
    return new Promise(async (resolve, reject) => {
      try {
        const data = await me();
        if (data?.address) {
          setLoginedAddress(data.address);
          setUser(data);
          resolve(data.address);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  async function logout() {
    chrome.storage.local.set({ access_token: '' }, function () {});
  }

  return {
    loginedAddress,
    setLoginedAddress,
    user,
    token,
    fetchLoginInfo: fetchLoginInfo as any,
    logout,
  };
}
