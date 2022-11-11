import React, { useState } from 'react';

import config from '../config';
import { users } from '../utils/apis';
import { fetchWrapped } from '../utils/apis/fetch';

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
    return new Promise((resolve, reject) => {
      fetchWrapped(config.baseURL + '/users/me', {
        method: 'GET',
      })
        .then((json) => {
          if (json?.data?.address) {
            setLoginedAddress(json.data.address);
            setUser(json.data);
            resolve(json.data.address);
          } else {
            reject();
          }
        })
        .catch(reject);
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
