import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, Link, SwipeableDrawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import toast, { Toaster } from 'react-hot-toast';

import { scrollToSection } from '../common/utils';
import Container from './Container';
import Beta from './Beta';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useSignMessage } from 'wagmi';
import { users } from '../types';
import { useEffect } from 'react';
import { fetchWrapped } from '../common/fetch';
import { WalletContext } from '../common/useWallet';

const HeaderAdmin = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [message, setMessage] = useState('');
  const { address, status } = useAccount();
  const { signMessageAsync } = useSignMessage({
    message: message,
  });
  const { user, setUser } = useContext(WalletContext);
  const [shouldLogin, setShowLogin] = useState(false);
  const getNonce = async (_address: string) => {
    const data = await fetch(
      process.env.NEXT_PUBLIC_APIBASE + '/users/nonce/' + _address,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );
    const json = await data.json();
    const message = json.data.signature_message;
    return message;
  };
  const signIn: (_address: string, _signature: string) => Promise<string> = (
    _address: string,
    _signature: string,
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data2 = await fetch(
          process.env.NEXT_PUBLIC_APIBASE + '/auth/signin',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              address: _address,
              signature: _signature,
            }),
          },
        );
        const json2 = await data2.json();
        if (json2.success && json2.data && json2.data.access_token) {
          const access_token = json2.data.access_token;
          resolve(access_token);
        } else {
          reject(new Error(json2.message || 'login fail'));
        }
      } catch (e) {
        reject(e);
      }
    });
  };
  async function sign(_address: string) {
    try {
      const _message = await getNonce(_address);
      setMessage(_message);
      const signature = await signMessageAsync();

      const access_token = await signIn(_address, signature);
      localStorage.setItem('access_token', access_token);
      window.location.reload();
    } catch (e) {
      console.error(e);
      toast.error('login fail');
    }
  }
  async function loadme() {
    try {
      const data = await fetchWrapped(
        `${process.env.NEXT_PUBLIC_APIBASE}/users/me`,
      );
      if (!data.success) throw new Error('load user fail');
      setUser(data.data);
      setShowLogin(false);
    } catch (e) {
      setShowLogin(true);
      toast.error('please login');
    }
  }

  React.useEffect(() => {
    loadme();
  }, []);

  useEffect(() => {
    if (status === 'connected' && address && shouldLogin) {
      sign(address);
    }
  }, [address, status, shouldLogin]);
  return (
    //@ts-ignore
    <Container
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      height={{ md: '80px', xs: '64px' }}
      borderBottom="1px solid #F2F4F7"
    >
      <Box display="flex" alignItems="center" width="100%">
        {/* <Box
          onClick={() => {
            router.push('/');
          }}
          sx={{ cursor: 'pointer' }}
          display="flex"
          alignItems="center"
        >
          <Box width="167px" component={'img'} src={'/icons/logo.png'} />
          <Beta marginLeft={1} marginTop={1} />
        </Box> */}

        <Box marginLeft="auto" sx={{ display: { md: 'block', xs: 'none' } }}>
          <Box sx={{ cursor: 'pointer' }}>
            {user ? <div>Connected: {user.address}</div> : null}
            {shouldLogin}
            {shouldLogin ? <ConnectButton /> : null}
          </Box>
        </Box>
      </Box>
      <Toaster />
    </Container>
  );
};

export default HeaderAdmin;
