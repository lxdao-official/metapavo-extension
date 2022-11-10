import { Box, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const typeMenu = (title: any, list: any) => (
  <Box>
    <Typography
      marginBottom={2}
      sx={{ fontWeight: 600, fontSize: '16px', lineHeight: '19.2px' }}
    >
      {title}
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap' }} gap="16px">
      {list.map((item: any) => (
        <Link
          color={'inherit'}
          sx={{
            textDecoration: 'none',
          }}
          href={item.url}
          target="_blank"
        >
          <Box
            sx={{
              padding: '16px 14px',
              display: 'flex',
              alignItems: 'center',
              background: '#FFFFFF',
              border: '0.5px solid #D0D5DD',
              borderRadius: '6px',
            }}
          >
            <img
              src={item.logo}
              style={{
                width: '32px',
                height: '32px',
                marginRight: '16px',
                borderRadius: '6px',
              }}
            />
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '24px',
                display: 'flex',
                alignItems: 'center',
                color: '#101828',
              }}
            >
              {item.name || item.title}
            </Typography>
          </Box>
        </Link>
      ))}
    </Box>
  </Box>
);
function SearchTab({ keywords }: any) {
  const [NFTList, setNFTList] = useState([]);
  const [DappsList, setDappsList] = useState([]);
  const [TokensList, setTokensList] = useState([]);
  const [serachShow, setSerachShow] = useState(false);
  const HTTPURL = 'https://api.metapavo.xyz';
  const getDapps = async () => {
    const r1: any = await fetch(
      HTTPURL + '/dapps/search/' + keywords,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const json1 = await r1.json();
    setDappsList(json1.data);
  };
  const getNFTs = async () => {
    const r1: any = await fetch(
      HTTPURL + '/nfts/search/v2/' + keywords,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const json1 = await r1.json();
    setNFTList(json1.data.records);
  };
  const getTokens = async () => {
    const r1: any = await fetch(
      HTTPURL + '/tokens/search/' + keywords,

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      },
    );

    const json1 = await r1.json();
    setTokensList(json1.data);
  };
  useEffect(() => {
    if (keywords) {
      setSerachShow(true);
      getDapps();
      getNFTs();
      getTokens();
    }
  }, [keywords]);
  const menuList = [
    { name: 'NFTs', list: NFTList },
    { name: 'Dapps', list: DappsList },
    { name: 'Tokens', list: TokensList },
  ];
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 56,
        left: 0,
        width: '100%',
        padding: '16px 24px 24px',
        border: '0.5px solid #D0D5DD',
        boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.06)',
        borderRadius: '6px',
        background: '#fff',
        display: serachShow ? '' : 'none',
      }}
    >
      {menuList.map((menu) => (
        <Box marginBottom={1}>
          {menu.list && menu.list.length > 0
            ? typeMenu(menu.name, menu.list)
            : null}
        </Box>
      ))}
    </Box>
  );
}

export default SearchTab;
