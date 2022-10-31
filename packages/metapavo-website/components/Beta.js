import React from 'react';
import { Box } from '@mui/material';

const Beta = (props) => (
  <Box
    display="block"
    width="36px"
    component={'img'}
    src={'/icons/beta.png'}
    {...props}
  />
);

export default Beta;
