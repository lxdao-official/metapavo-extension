import { Box, Link, Typography } from '@mui/material';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

import Container from '../components/Container';
import Pavo from '../components/pavo';

const FirstSection = (props) => {
  return (
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
            Your Web3 Personal Information Assistant
          </Typography>
        </Box>
        <Typography
          variant="body1"
          fontSize={{ md: '22px', xs: '16px' }}
          color="text.secondary"
          marginTop={4}
        >
          MetaPavo is your Web3 Personal Information Assistant. Valuable Web3
          information All-in-One brings you a safe, efficient, and seamless Web3
          experience. Developed and maintained by{' '}
          <Link
            href={`https://lxdao.io/`}
            target="_blank"
            color={'inherit'}
            sx={{
              textDecoration: 'none',
            }}
          >
            LXDAO
          </Link>
          .
        </Typography>{' '}
        <Box marginTop={8} display="flex" flexWrap="wrap">
          <Link
            href="https://chrome.google.com/webstore/detail/metapavo-personal-web3-in/gjaelahefgghcaahmhbppimgiebkjlpo"
            target="_blank"
          >
            <Box
              marginRight={2}
              marginBottom={2}
              sx={{
                cursor: 'pointer',
              }}
            >
              <Box
                display="block"
                height={{
                  xs: '48px',
                  md: '58px',
                }}
                component={'img'}
                src={'/icons/download-button.png'}
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            </Box>
          </Link>
          <Link
            href={`https://metapavo.gitbook.io/whitepaper/`}
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
              WhitePaper
            </Box>
          </Link>
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
          gas={props.gas}
        />
      </Box>
      <Toaster />
    </Container>
  );
};

export default FirstSection;
