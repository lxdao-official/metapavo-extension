import { PropaneSharp } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

export default function CardModule(props: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      style={{
        width: '1024px',
        margin: '0 auto',
        padding: '16px',
        border: '1px solid #efefef',
        borderRadius: '10px',
        background: '#f7f7f7',
      }}
    >
      <Box
        style={{
          fontSize: '18px',
          fontWeight: 600,
          lineHeight: '30px',
          color: '#252525',
        }}
      >
        {props.title}
      </Box>
      <div>{props.children}</div>
    </Box>
  );
}
