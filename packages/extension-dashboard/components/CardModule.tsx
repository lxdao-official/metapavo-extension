import { PropaneSharp } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

export default function CardModule(props: {
  title: string;
  children: React.ReactNode;
  extra?: React.ReactNode;
}) {
  return (
    <Box
      style={{
        margin: '0 auto',
        padding: '16px',
        borderRadius: '10px',
        background: '#fff',
        marginBottom: '20px',
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
        {props.extra}
      </Box>
      <div>{props.children}</div>
    </Box>
  );
}
