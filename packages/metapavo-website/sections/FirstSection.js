import React from 'react';
import { Link, Box, Typography } from '@mui/material';
import Container from '../components/Container';
import toast, { Toaster } from 'react-hot-toast';
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
            All-in-One Web3 Information Linking Solution
          </Typography>
        </Box>
        <Typography
          variant="body1"
          fontSize={{ md: '22px', xs: '16px' }}
          color="text.secondary"
          marginTop={4}
        >
          MetaPavo is a Web3 information aggregator. Valuable Web3 information
          All-in-One brings you a safe, efficient, and seamless Web3 experience.
          Developed and maintained by{' '}
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
          <Box
            marginRight={2}
            marginBottom={2}
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              toast(
                'We are in the process of building the app. Please apply for the early access. Stay tuned!',
              );
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

          <Link
            href={`https://forms.gle/A5XiKgg94EyJdCbS7`}
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
              Apply for Early Access
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
