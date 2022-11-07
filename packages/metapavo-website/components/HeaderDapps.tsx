import MenuIcon from '@mui/icons-material/Menu';
import { Box, Link, SwipeableDrawer, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAccount, useSignMessage } from 'wagmi';

import Container from './Container';

const HeaderDapps = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [message, setMessage] = useState('');
  const { address, status } = useAccount();
  const { signMessageAsync } = useSignMessage({
    message: message,
  });

  React.useEffect(() => {}, []);

  useEffect(() => {
    if (status === 'connected' && address) {
    }
  }, [address, status]);

  return (
    //@ts-ignore
    <div>
      <Container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        height={{ md: '80px', xs: '64px' }}
        borderBottom="1px solid #F2F4F7"
      >
        <Box display="flex" alignItems="center" width="100%">
          <Box
            onClick={() => {
              router.push('/');
            }}
            sx={{ cursor: 'pointer' }}
            display="flex"
            alignItems="center"
          >
            <Box width="167px" component={'img'} src={'/icons/logo.png'} />
          </Box>
          <Box marginLeft="auto" sx={{ display: { md: 'block', xs: 'none' } }}>
            <Box sx={{ cursor: 'pointer' }}>
              <ConnectButton />
            </Box>
          </Box>
        </Box>
        <Toaster />
      </Container>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={{ md: '80px', xs: '64px' }}
        sx={{ background: '#6047FC' }}
      >
        <Typography color="#fff">
          Install the chrome plugin to better experience MetaPavo products.
        </Typography>
        <Box
          width="109px"
          height="48px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginLeft={3}
          sx={{
            background: '#fff',
            border: '0.5px solid #D0D5DD',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
          onClick={() => {
            toast(
              'We are in the process of building the app. Please apply for the early access. Stay tuned!',
            );
          }}
        >
          <Typography
            textTransform="capitalize"
            sx={{
              background:
                'linear-gradient(89.77deg, #6EDFA3 3.4%, #2292F9 54.78%, #7F56D9 100.87%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            download
          </Typography>
        </Box>
        <Box sx={{ position: 'absolute', right: '24px' }}>
          <img src="/icons/delete.svg" />
        </Box>
      </Box>
    </div>
  );
};

export default HeaderDapps;
