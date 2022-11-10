import { Box, Grid } from '@mui/material';
import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import { useEffect, useState } from 'react';

import CoinPriceCard from '../cards/CoinPriceCard';

export default function CoinPrices(props: { symbols: string[] }) {
  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      <Grid container spacing={1}>
        {props.symbols.map((symbol) => {
          return (
            <Grid item xs={6}>
              <CoinPriceCard symbol={symbol}></CoinPriceCard>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
