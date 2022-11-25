import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { ethers, utils } from 'ethers';
import { fetchWrapped } from 'extension-common/src/apis/fetch';
import createMetaMaskProvider from 'metamask-extension-provider';
import React, { useState } from 'react';
import Web3 from 'web3';

import config from '../../../config';
import abi from './pavoid';
import { PavoID } from './typechain-types';

export const WalletContext = React.createContext<{
  address: string;
  maskProvider: any;
  setAddress: (address: string) => void;
  loginedAddress: string;
  setLoginedAddress: (loginedAddress: string) => void;
  fetchLoginInfo: () => Promise<string | null>;
  signinWithMetamask: (invite_code: string) => Promise<string>;
  signinWithWalletConnect: (invite_code: string) => Promise<string>;
  logout: () => Promise<void>;
  showMint: boolean;
  setShowMint: (showMint: boolean) => void;
  submitMint: (did: string) => Promise<void>;
}>({} as any);
const connector = new WalletConnect({
  bridge: 'https://bridge.walletconnect.org', // Required
  qrcodeModal: QRCodeModal,
});

export default function useWallet() {
  const [address, setAddress] = useState('');
  const [loginedAddress, setLoginedAddress] = useState('');
  const [showMint, setShowMint] = useState(false);
  const maskProvider = createMetaMaskProvider();
  maskProvider.key = 'metapavo';
  maskProvider.on('networkChanged', (networkId: string) => {
    console.log('networkChanged', networkId);
    window.location.reload();
  });
  const provider = new ethers.providers.Web3Provider(maskProvider);

  const getNonce = async (_address: string, invite_code: string) => {
    try {
      const data = await fetch(
        config.baseURL +
          '/users/nonce/' +
          _address +
          '?invite_code=' +
          invite_code,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      );

      const json = await data.json();
      if (json.success) {
        const message = json.data.signature_message;
        return message;
      } else {
        throw new Error(json.message);
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };
  const signIn: (_address: string, _signature: string) => Promise<string> = (
    _address: string,
    _signature: string,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data2 = await fetch(config.baseURL + '/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            address: _address,
            signature: _signature,
          }),
        });
        const json2 = await data2.json();
        if (json2.success && json2.data && json2.data.access_token) {
          const access_token = json2.data.access_token;
          chrome.storage.local.set(
            { access_token: access_token },
            function () {},
          );
          fetchLoginInfo();
          resolve(access_token);
        } else {
          if (json2.message === 'have no pavoId') {
            setShowMint(true);
          }
          reject(new Error(json2.message || 'login fail'));
        }
      } catch (e: any) {
        reject(e);
      }
    });
  };

  const signinWithWalletConnect: (invite_code: string) => Promise<string> = (
    invite_code,
  ) => {
    return new Promise(async (resolve, reject) => {
      console.log('connector.connected', connector.connected);
      if (!connector.connected) {
        // create new session
        connector.createSession();
      } else {
        await connector.killSession();
        connector.createSession();
      }

      connector.on('connect', async (error, payload) => {
        // Get provided accounts and chainId
        const { accounts } = payload.params[0];
        if (accounts.length) {
          const _address = accounts[0];
          setAddress(_address);
          const message = await getNonce(_address, invite_code);
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
          reject(new Error('connect empty address'));
        }
      });
      connector.on('disconnect', async () => {
        // Delete connector
        reject(new Error('disconnect'));
      });
    });
  };
  const checkMetaMaskValid: () => Promise<boolean> = () => {
    return new Promise(async (resolve) => {
      console.log('maskProvider', maskProvider);
      maskProvider.on('error', () => {
        console.log('maskProvider error');
        resolve(false);
      });
    });
  };
  async function switchNetwork() {
    try {
      await provider.send('wallet_switchEthereumChain', [
        {
          chainId: config.network.chainId,
        },
      ]);
    } catch (error: any) {
      console.log(error);
      if ((error.code = 4902)) {
        return await addNetwork();
      }
      throw error;
    }
  }
  //添加网络
  async function addNetwork() {
    try {
      return await provider.send('wallet_addEthereumChain', [
        {
          chainId: config.network.chainId,
          chainName: config.network.name,
          rpcUrls: [config.network.url],
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  const submitMint: (did: string) => Promise<void> = (did: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        try {
          // MetaMask requires requesting permission to connect users accounts
          await provider.send('eth_requestAccounts', []);
        } catch (e: any) {
          reject(e);
        }
        const pavoIdContract = new ethers.Contract(
          config.address.pavoid,
          abi,
          provider.getSigner(),
        ) as PavoID;
        pavoIdContract.connect(provider.getSigner());
        const price = await pavoIdContract.getPrice(did);

        const tx = await pavoIdContract.mint(did, {
          value: price,
        });
        await tx.wait();
        resolve();
      } catch (e: any) {
        reject(e);
      }
    });
  };
  const signinWithMetamask: (invite_code: string) => Promise<string> = (
    invite_code,
  ) => {
    return new Promise(async (resolve, reject) => {
      console.log('maskProvider', maskProvider);
      // await switchNetwork();
      maskProvider.on('error', () => {
        reject(new Error('metamask connect error'));
      });

      try {
        await provider.send('eth_requestAccounts', []);
      } catch (e: any) {
        reject(e);
      }
      const signer = provider.getSigner();
      const _address = await signer.getAddress();
      if (_address) {
        setAddress(address);
        try {
          const message = await getNonce(_address, invite_code);

          const signature = await signer.signMessage(message);

          const access_token = await signIn(_address, signature);
          resolve(access_token);
        } catch (e) {
          reject(e);
        }
      } else {
        reject(new Error('connect empty address'));
      }
    });
  };
  async function fetchLoginInfo() {
    return new Promise((resolve, reject) => {
      fetchWrapped(config.baseURL + '/users/me', {
        method: 'GET',
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
    chrome.storage.local.set({ access_token: '' }, function () {});
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
    showMint,
    setShowMint,
    submitMint,
  };
}
