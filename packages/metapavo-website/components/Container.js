import React from 'react';
import Box from '@mui/material/Box';

// eslint-disable-next-line react/prop-types
const Container = ({
  borderBottom,
  children,
  maxWidth,
  minHeight,
  sx,
  ...rest
}) => (
  <Box borderBottom={borderBottom} sx={sx}>
    <Box
      maxWidth={maxWidth || '1280px'}
      minHeight={minHeight}
      width="100%"
      paddingX={{ md: 4, xs: 2 }}
      boxSizing="border-box"
      marginX={'auto'}
      {...rest}
    >
      {children}
    </Box>
  </Box>
);

export default Container;
