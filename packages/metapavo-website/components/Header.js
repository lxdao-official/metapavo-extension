import MenuIcon from '@mui/icons-material/Menu';
import { Box, Link, SwipeableDrawer, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { scrollToSection } from '../common/utils';
import Beta from './Beta';
import Container from './Container';

function DownloadButton() {
  return (
    <Box
      border="1px solid #E8E8E8"
      paddingY={1}
      paddingX={2}
      borderRadius={2}
      sx={{
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        '&:hover': {
          borderColor: '#925BFE',
        },
      }}
    >
      <Box
        display="block"
        width="106px"
        component={'img'}
        src={'/icons/header-download.png'}
      />
    </Box>
  );
}

const menus = [
  // {
  //   title: 'Features',
  //   type: 'scroll',
  //   id: 'features',
  // },

  {
    title: 'Twitter',
    type: 'link',
    url: 'https://twitter.com/MetaPavo',
  },
  {
    title: 'Discord',
    type: 'link',
    url: 'http://discord.lxdao.io/',
  },
  {
    title: 'LXDAO',
    type: 'link',
    url: 'https://lxdao.io/',
  },
  {
    title: 'User Security',
    type: 'link',
    url: 'https://metapavo.gitbook.io/whitepaper/user-security-manual-zhong-wen',
  },
];

const Header = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(open);
  };

  return (
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
          <Beta marginLeft={1} marginTop={1} />
        </Box>

        <Box gap="24px" marginLeft={7} display={{ md: 'flex', xs: 'none' }}>
          {menus.map((menu, index) => {
            if (menu.type === 'scroll') {
              return (
                <Typography
                  key={index}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    scrollToSection(menu.id);
                  }}
                >
                  {menu.title}
                </Typography>
              );
            }
            if (menu.type === 'link') {
              return (
                <Link
                  key={index}
                  href={menu.url}
                  target="_blank"
                  sx={{
                    textDecoration: 'none',
                  }}
                >
                  <Typography>{menu.title}</Typography>
                </Link>
              );
            }
          })}
        </Box>
        <Box sx={{ display: { md: 'none', xs: 'block' }, marginLeft: 'auto' }}>
          <MenuIcon
            sx={{
              cursor: 'pointer',
            }}
            fontSize="large"
            onClick={toggleDrawer(true)}
          />
          <SwipeableDrawer
            anchor="top"
            open={openMenu}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              {menus.map((menu, index) => {
                if (menu.type === 'scroll') {
                  return (
                    <Typography
                      key={index}
                      paddingX={2}
                      paddingY={1}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        scrollToSection(menu.id);
                      }}
                    >
                      {menu.title}
                    </Typography>
                  );
                }
                if (menu.type === 'link') {
                  return (
                    <Link
                      key={index}
                      href={menu.url}
                      target="_blank"
                      sx={{
                        textDecoration: 'none',
                      }}
                    >
                      <Typography paddingX={2} paddingY={1}>
                        {menu.title}
                      </Typography>
                    </Link>
                  );
                }
              })}
            </Box>
          </SwipeableDrawer>
        </Box>
      </Box>
      <Toaster />
    </Container>
  );
};

export default Header;
