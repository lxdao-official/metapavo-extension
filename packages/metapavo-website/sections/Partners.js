import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import Container from '../components/Container';

const partners = [
  {
    url: 'https://lxdao.io/',
    image: '/partners/LXDAO.png',
  },
  {
    url: 'https://nextdao.xyz/',
    image: '/partners/NEXTDAOLOGO.png',
  },
];

function Partner({ url, image }) {
  return (
    <Link
      color={'inherit'}
      sx={{
        textDecoration: 'none',
      }}
      href={url}
      target="_blank"
    >
      <Box
        display="flex"
        height={{ md: 140, xs: 70 }}
        width={{ md: 250, xs: 125 }}
        alignItems="center"
        justifyContent="center"
        border="1px solid #E8E8E8"
        borderRadius={2}
        overflow="hidden"
      >
        <img src={image} alt="" width="100%" />
      </Box>
    </Link>
  );
}

const Partners = () => {
  return (
    <Container
      paddingTop={{ xs: 4, md: 8 }}
      paddingBottom={{ xs: 8, md: 16 }}
      id="partners"
    >
      <Typography
        textAlign="center"
        fontWeight="bold"
        fontSize={{ md: '48px', xs: '32px' }}
      >
        Our Partners
      </Typography>

      <Box
        display="flex"
        gap={{ xs: 2, md: 4 }}
        justifyContent="center"
        marginTop={{ xs: 6, md: 12 }}
        flexWrap="wrap"
      >
        {partners.map((partner, index) => {
          return <Partner key={index} {...partner} />;
        })}
      </Box>
    </Container>
  );
};

export default Partners;
