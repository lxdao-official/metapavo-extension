import { Box, Button, Link, Typography } from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAccount, useNetwork } from 'wagmi';

import Container from '../../components/Container';
import Layout from '../../components/Layout';
import Pavo from '../../components/pavo';

export default function Home() {
  const [gas, setGas] = React.useState(0);
  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  async function getNowGas() {
    let _nowGas = 0;
    const r3 = await fetch(
      'https://app.defisaver.com/api/gas-price/1559/current',

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const json3 = await r3.json();
    if (
      json3.blockPrices &&
      json3.blockPrices.length &&
      json3.blockPrices[0].baseFeePerGas
    ) {
      _nowGas = Math.floor(json3.blockPrices[0].baseFeePerGas);
    }
    return _nowGas;
  }

  useEffect(() => {
    (async () => {
      const gas = await getNowGas();
      setGas(gas);
    })();
  }, []);
  const router = useRouter();
  const [invitecode_status, setInvitecodeStatus] = React.useState('invalid');
  async function checkInvitecode() {
    const invitecode = router.query.id;
    if (invitecode) {
      const r = await fetch(
        `https://api.metapavo.xyz/users/invite/${invitecode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const json = await r.json();
      if (!json.data) {
        setInvitecodeStatus('invalid');
      } else {
        if (json.data.used_by_user_id) {
          setInvitecodeStatus('used');
        } else {
          setInvitecodeStatus('valid');
        }
      }
    }
  }

  useEffect(() => {
    checkInvitecode();
  }, [router.query.id]);

  const { address, isConnected, status } = useAccount();
  const { chain: currentChain } = useNetwork();

  const getNonce = async (_address, invite_code) => {
    try {
      const data = await fetch(
        'https://api.metapavo.xyz' +
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
        if (json.data.isExist) {
          throw new Error(
            router.query.lang == 'en'
              ? 'This account has been bound'
              : '此账号已经绑定过',
          );
        }
        return message;
      } else {
        throw new Error(json.message);
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  async function bind() {
    if (!isConnected) {
      toast.error(
        router.query.lang == 'en'
          ? 'Please connect wallet first'
          : '请先链接钱包',
      );
      return;
    } else if (!address) {
      toast.error(
        router.query.lang == 'en'
          ? 'Please connect wallet first'
          : '请先链接钱包',
      );
      return;
    } else {
      try {
        const message = await getNonce(address, router.query.id);
        toast.success(
          router.query.lang == 'en'
            ? 'Bind successfully, please download extension to use'
            : '绑定成功，请下载插件使用',
        );
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (e) {
        toast.error(e.message);
      }
    }
  }
  return (
    <Layout>
      <Container
        paddingTop={12}
        display="flex"
        flexDirection={{ md: 'row', xs: 'column' }}
        justifyContent="center"
        alignItems="center"
      >
        <Box>
          <Box display="flex" alignItems="flex-start">
            <Typography
              fontSize={{ md: '44px', xs: '32px' }}
              lineHeight={1.2}
              fontWeight="bold"
            >
              {router.query.lang == 'en'
                ? 'We sincerely invite you to join MetaPavo Public Beta'
                : '诚邀您加入 MetaPavo 公测'}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            fontSize={{ md: '22px', xs: '16px' }}
            color="text.secondary"
            marginTop={4}
          >
            {router.query.lang == 'en'
              ? 'MetaPavo is your Web3 Personal Information Assistant. Valuable Web3 information All-in-One brings you a safe, efficient, and seamless Web3 experience. '
              : 'MetaPavo 是一个 Web3 个人信息助理，具备 分类管理信息/搜索/识别 等核心能力。它旨在帮助 Web3 用户快速获取对他们有用的信息。'}
          </Typography>{' '}
          {invitecode_status == 'valid' && (
            <>
              <Box marginTop={4} display="flex" flexWrap="wrap">
                {router.query.lang == 'en'
                  ? 'This invitation code is available, please connect wallet to lock this invitation code'
                  : '此邀请码可用，请链接钱包锁定此邀请码'}
              </Box>
              <Box marginTop={1} display="flex" flexWrap="wrap">
                <ConnectButton />
              </Box>
            </>
          )}
          <Box marginTop={4} display="flex" flexWrap="wrap">
            <Box
              marginRight={2}
              marginBottom={2}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Box display="block">
                {invitecode_status == 'used' && (
                  <Button
                    disabled
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 0.8,
                      },
                      background: '#ddd',
                      color: '#666',
                      height: '58px',
                      padding: '0 24px',
                      fontSize: '18px',
                    }}
                  >
                    {router.query.lang == 'en'
                      ? 'The invitation code has been used'
                      : '邀请码已被使用'}
                  </Button>
                )}
                {invitecode_status == 'invalid' && (
                  <Button
                    disabled
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 0.8,
                      },
                      background: '#ddd',
                      color: '#666',
                      height: '58px',
                      padding: '0 24px',
                      fontSize: '18px',
                    }}
                  >
                    {router.query.lang == 'en'
                      ? 'Invalid invitation code'
                      : '无效邀请码'}
                  </Button>
                )}
                {invitecode_status == 'valid' && (
                  <Button
                    type="primary"
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        opacity: 0.8,
                      },
                      background:
                        'linear-gradient(91.75deg, #7de2ac 0%, #389dfa 49.26%, #9f50ff 97.76%)',
                      color: '#fff',
                      height: '58px',
                      padding: '0 24px',
                      fontSize: '18px',
                    }}
                    onClick={() => {
                      bind();
                    }}
                  >
                    {router.query.lang == 'en'
                      ? 'Available invitation code, binding wallet'
                      : '可用邀请码，绑定钱包'}
                    {address ? `(${formatAddress(address) || ''})` : ''}
                  </Button>
                )}
              </Box>
            </Box>
            <Link
              href={`https://chrome.google.com/webstore/detail/metapavo-personal-web3-in/gjaelahefgghcaahmhbppimgiebkjlpo`}
              target="_blank"
              sx={{
                textDecoration: 'none',
              }}
              height={{
                xs: '48px',
                md: '58px',
              }}
            >
              <Box
                height="100%"
                border="1px solid #E8E8E8"
                paddingY={1}
                paddingX={4}
                borderRadius={2}
                display="flex"
                alignItems="center"
                fontSize={{ xs: '16px', md: '20px' }}
                sx={{
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    borderColor: '#925BFE',
                  },
                }}
              >
                {router.query.lang == 'en' ? 'Download Extension' : '下载插件'}
              </Box>
            </Link>
          </Box>
          <Box marginTop={4} display="flex" flexWrap="wrap">
            {router.query.lang == 'en'
              ? 'First use the invitation code to bind the wallet, and then download the extension and use the wallet directly to log in and use'
              : '首先使用该邀请码绑定钱包，然后下载插件后使用该钱包直接登录使用即可'}
          </Box>
        </Box>
        <Box
          marginTop={{ md: 0, xs: 8 }}
          flex={{ md: '0 0 600px', xs: '0 0 100%' }}
          minHeight={{ xs: 'auto', md: '600px' }}
          width="100%"
          position={'relative'}
        >
          <img src="/images/hero.png" width="100%" />
          <Pavo
            style={{
              position: 'absolute',
              right: '10%',
              bottom: '38%',
              zIndex: '100',
            }}
            gas={gas}
          />
        </Box>
        <Toaster />
      </Container>
    </Layout>
  );
}
