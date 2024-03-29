import { Box, Link, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { projectLinksWrapper } from '../common/project_wrapper';

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
            cursor: 'pointer',
          }}
          href={item.url}
          target="_blank"
          key={item.id}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open(item.url);
          }}
        >
          {title == 'Tokens' ? tokenCard(item) : appCard(item)}
        </Link>
      ))}
    </Box>
  </Box>
);
const appCard = (item: any) => (
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
);
const tokenCard = (item: any) => (
  <Box
    width="300px"
    sx={{
      padding: '16px 14px',
      background: '#FFFFFF',
      border: '0.5px solid #D0D5DD',
      borderRadius: '6px',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
      }}
    >
      <Box display="flex" alignItems="center">
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
          display="block"
          sx={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '24px',
            display: 'flex',
            alignItems: 'center',
            color: '#101828',
            maxWidth: '128px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.name || item.title}
        </Typography>
      </Box>
      <Typography
        fontWeight={600}
        fontSize="16px"
        lineHeight="19px"
        color="#4DCC9E"
      >
        $ 21035.26
      </Typography>
    </Box>
    <Box display="flex" alignItems="center" justifyContent="flex-end">
      <img
        src={item.up ? '/icons/line-up.svg' : '/icons/line-down.svg'}
        style={{ width: '14px', height: '6px', marginRight: '8px' }}
      />
      <Typography
        color={item.up ? '#4DCC9E' : '#FF6E6E'}
        fontSize="14px"
        lineHeight="24px"
      >
        +1.39%
      </Typography>
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
    if (json1 && json1.data.records) {
      json1.data.records.map((fav: any) => {
        if (fav.nftProjectInfo) {
          const pp = projectLinksWrapper(fav.nftProjectInfo);
          fav.url = pp.links?.nftnerds;
        }
      });
      setNFTList(json1.data.records);
    }
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
    if (json1 && json1.data) {
      json1.data.map((fav: any) => {
        if (fav) {
          fav.url = `https://coinmarketcap.com/zh/currencies/${fav.slug}/`;
        }
      });
      setTokensList(json1.data);
    }
  };
  useEffect(() => {
    if (keywords) {
      setSerachShow(true);
      getDapps();
      getNFTs();
      getTokens();
    } else {
      setSerachShow(false);
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
        zIndex: 3,
      }}
    >
      {menuList.map((menu: any) => (
        <Box marginBottom={3} key={menu.id}>
          {menu.list && menu.list.length > 0
            ? typeMenu(menu.name, menu.list)
            : null}
        </Box>
      ))}
    </Box>
  );
}

export default SearchTab;
