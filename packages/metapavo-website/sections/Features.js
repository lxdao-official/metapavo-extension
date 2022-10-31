import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '../components/Container';

function Feature({ content, img, imageLeft = false }) {
  return (
    <Grid marginTop={4} spacing={{ xs: 0, md: 18 }} container>
      <Grid
        item
        xs={12}
        md={6}
        order={imageLeft ? { xs: 1, md: 2 } : 1}
        display="flex"
        alignItems="center"
      >
        {content}
      </Grid>
      <Grid item xs={12} md={6} order={imageLeft ? 1 : 2}>
        <Box margin="0 auto" maxWidth={{ xs: '300px', md: '100%' }}>
          <img width="100%" src={img} alt="" />
        </Box>
      </Grid>
    </Grid>
  );
}

const Features = () => {
  return (
    <Container
      marginTop={{
        md: 16,
        xs: 8,
      }}
      paddingBottom={{
        md: 8,
        xs: 4,
      }}
      maxWidth="1140px"
      id="features"
    >
      <Box>
        <Typography
          textAlign="center"
          fontWeight="bold"
          fontSize={{ md: '48px', xs: '28px' }}
        >
          MetaPavo Provides More
        </Typography>
        <Feature
          content={
            <Box marginBottom={4}>
              <Typography fontSize={{ md: '38px', xs: '26px' }}>
                Bring valuable information for you efficiently
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={4}
                color="#646F7C"
              >
                MetaPavo tries to identify the &quot;subject&quot; from the
                webpage and search for related information. Then present the
                most valuable information to you.
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={2}
                color="#646F7C"
              >
                Including all Web3-related information.
              </Typography>
            </Box>
          }
          img="/images/feature1.png"
        />
        <Feature
          imageLeft={true}
          content={
            <Box marginBottom={4}>
              <Typography fontSize={{ md: '38px', xs: '26px' }}>
                Bring you a safer experience
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={4}
                color="#646F7C"
              >
                Phishing attack? Malicious website? Stolen NFTs? MetaPavo
                integrates security-related information to help you identify the
                entity&apos;s risk.
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={2}
                color="#646F7C"
              >
                MetaPavo also provides attacking detection features for you.
                (Coming soon)
              </Typography>
            </Box>
          }
          img="/images/feature2.png"
        />
        <Feature
          content={
            <Box marginBottom={4}>
              <Typography fontSize={{ md: '38px', xs: '26px' }}>
                Extensible and customizable plugins make your life much easier
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={4}
                color="#646F7C"
              >
                Follow up the projects? Convert time to your local time? Create
                event alarm? Swap tokens? You can find all you need in MetaPavo.
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={2}
                color="#646F7C"
              >
                It is open-source and you can buidl your own.
              </Typography>
            </Box>
          }
          img="/images/feature3.png"
        />
        <Feature
          imageLeft={true}
          content={
            <Box marginBottom={4}>
              <Typography fontSize={{ md: '38px', xs: '26px' }}>
                Be the bridge for users to contribute data to the Web3 ecosystem
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={4}
                color="#646F7C"
              >
                Reporting Malicious projects? Score projects? Tag addresses?
                Submit stolen NFTs?
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={2}
                color="#646F7C"
              >
                You can contribute data to the Web3 ecosystem through MetaPavo.
              </Typography>
              <Typography
                fontSize={{ md: '22px', xs: '16px' }}
                marginTop={2}
                color="#646F7C"
              >
                And yes! You deserve rewards!
              </Typography>
            </Box>
          }
          img="/images/feature4.png"
        />
      </Box>
    </Container>
  );
};

export default Features;
