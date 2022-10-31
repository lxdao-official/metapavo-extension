import React from 'react';
import { Box, Link } from '@mui/material';
import Container from '../components/Container';

const EarlyAccess = () => {
  return (
    <Container
      paddingY={10}
      sx={{
        background: '#4299FF',
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Link
        href={`https://forms.gle/A5XiKgg94EyJdCbS7`}
        target="_blank"
        sx={{
          textDecoration: 'none',
        }}
      >
        <Box
          sx={{
            background: '#fff',
            cursor: 'pointer',
          }}
          color="#4299FF"
          paddingY={1}
          paddingX={3}
          borderRadius={2}
          boxShadow={2}
        >
          Apply for Early Access
        </Box>
      </Link>
    </Container>
  );
};

export default EarlyAccess;
