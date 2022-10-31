import React from 'react';
import { Box, Typography } from '@mui/material';
import Container from '../components/Container';
import Pavo from '../components/pavo';

const CoreConcept = (props) => {
  return (
    <Container>
      <Box position="relative">
        <Typography
          zIndex={1}
          textAlign="center"
          fontWeight="bold"
          fontSize={{ md: '44px', xs: '28px' }}
          sx={{
            position: { md: 'absolute', xs: 'relative' },
            top: { md: 120, xs: 0 },
            left: 0,
            right: 0,
          }}
        >
          Link All Valuable Web3 Information Just Like Pavo
        </Typography>
        <img width="100%" src="/images/apps.png" alt="Apps" />
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            right: 0,
            bottom: '-21.5%',
            marginLeft: '-10%',
            width: '19%',
          }}
        >
          <img width="100%" src="/images/connect.png" alt="" />
        </Box>
      </Box>
      <Box marginTop={{ xs: 10, md: 20 }} maxWidth="1200px" marginX="auto">
        <img width="100%" src="/images/pavo.jpg" alt="" />
      </Box>
      <Box
        maxWidth="550px"
        marginX="auto"
        marginTop={{
          md: 12,
          xs: 6,
        }}
      >
        <Typography
          textAlign="center"
          fontSize={{ md: '38px', xs: '26px' }}
          fontWeight="bold"
        >
          The MetaPavo Live in Your Browser&apos;s Corner
        </Typography>
      </Box>
      <Box
        textAlign="center"
        marginTop={{
          md: 8,
          xs: 4,
        }}
        position="relative"
      >
        <img
          style={{ width: '100%', maxWidth: '1036px' }}
          src="/images/browser1.png"
          alt=""
        />
        <Pavo
          style={{
            position: 'absolute',
            right: '15%',
            bottom: '20%',
            zIndex: '100',
          }}
          gas={props.gas}
        />
      </Box>
      <Box
        maxWidth="600px"
        margin="0 auto"
        marginTop={{
          md: 8,
          xs: 4,
        }}
      >
        <Typography
          textAlign="center"
          fontSize={{ md: '38px', xs: '26px' }}
          fontWeight="bold"
        >
          Opening Feathers when detecting valuable information
        </Typography>
      </Box>
      <Box
        textAlign="center"
        marginTop={{
          md: 8,
          xs: 4,
        }}
        position="relative"
      >
        <img
          style={{ width: '100%', maxWidth: '1036px' }}
          src="/images/browser2.png"
          alt=""
        />
        <Pavo
          style={{
            position: 'absolute',
            right: '15%',
            bottom: '20%',
            zIndex: '100',
          }}
          gas={props.gas}
        />
      </Box>
      <Typography textAlign="center" fontSize={{ md: '26px', xs: '18px' }}>
        We start from NFTs information for now, will add more information
        gradually.
      </Typography>
    </Container>
  );
};

export default CoreConcept;
