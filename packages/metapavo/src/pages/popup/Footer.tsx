import { Box, Link } from '@mui/material';

const Footer = () => {
  const buildin = chrome?.runtime.getURL('images/build-in-lxdao.png');
  return (
    <Link href="https://lxdao.io/projects/002" target="_blank">
      <Box
        display="flex"
        width="100%"
        height="80px"
        justifyContent="center"
        alignItems="center"
        borderTop="1px solid #F2F4F7"
        style={{
          backgroundColor: '#f9f9f9',
        }}
      >
        <Box height="60px" component={'img'} src={buildin} />
      </Box>
    </Link>
  );
};

export default Footer;
