import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Container from '../components/Container';

const BuildInLXDAO = () => {
  return (
    <Container
      sx={{
        background: '#FBFDFF',
      }}
      paddingTop={{ xs: 4, md: 8 }}
      paddingBottom={{ xs: 8, md: 16 }}
    >
      <Typography
        textAlign="center"
        fontWeight="bold"
        fontSize={{ md: '48px', xs: '32px' }}
      >
        Buidl in LXDAO
      </Typography>
      <Typography
        fontSize={{ md: '26px', xs: '18px' }}
        color="#646F7C"
        textAlign="center"
        marginTop={2}
      >
        We buidl Valuable things for Web3 in the Web3 way
      </Typography>
      <Grid
        marginTop={{
          md: 8,
          xs: 4,
        }}
        container
        spacing={{ xs: 2, md: 4 }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Box
            borderRadius={2}
            paddingY={{ xs: 3, md: 6 }}
            paddingX={{ xs: 3, md: 5 }}
            height="100%"
            sx={{
              background: '#B9E3F0',
            }}
          >
            <Typography fontSize={{ md: '32px', xs: '22px' }} fontWeight="bold">
              Decentralized
            </Typography>
            <Typography
              fontSize={{ md: '18px', xs: '14px' }}
              color="#646F7C"
              marginTop={2}
            >
              The community makes decisions and feature requests. And share the
              benefits.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box
            borderRadius={2}
            paddingY={{ xs: 3, md: 6 }}
            paddingX={{ xs: 3, md: 5 }}
            height="100%"
            sx={{
              background: '#EDE2FF',
            }}
          >
            <Typography fontSize={{ md: '32px', xs: '22px' }} fontWeight="bold">
              Open
            </Typography>
            <Typography
              fontSize={{ md: '18px', xs: '14px' }}
              color="#646F7C"
              marginTop={2}
            >
              We are open to everyone who wants to contribute to the project and
              LXDAO.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Box
            borderRadius={2}
            paddingY={{ xs: 3, md: 6 }}
            paddingX={{ xs: 3, md: 5 }}
            height="100%"
            sx={{
              background: '#CCE9BE',
            }}
          >
            <Typography fontSize={{ md: '32px', xs: '22px' }} fontWeight="bold">
              Safe
            </Typography>
            <Typography
              fontSize={{ md: '18px', xs: '14px' }}
              color="#646F7C"
              marginTop={2}
            >
              Buidl for the community, maintained by the community, supervised
              by the community.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BuildInLXDAO;
