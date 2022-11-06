import { Box, Grid } from '@mui/material';
import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import { useEffect, useState } from 'react';

/**
 * 
 * @returns [
    1499040000000,      // Kline open time
    "0.01634790",       // Open price
    "0.80000000",       // High price
    "0.01575800",       // Low price
    "0.01577100",       // Close price
    "148976.11427815",  // Volume
    1499644799999,      // Kline Close time
    "2434.19055334",    // Quote asset volume
    308,                // Number of trades
    "1756.87402397",    // Taker buy base asset volume
    "28.46694368",      // Taker buy quote asset volume
    "0"                 // Unused field, ignore.
  ]
 */
export default function CoinPrices(props: { symbol: string }) {
  const [option, setOption] = useState<any>({});
  const loadBTC = async () => {
    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${props.symbol}&interval=5m`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const json = await res.json();
    const btcPrices: any[] = [];
    const lastDayBTCPrices: any[] = [];
    const lastDayStart = moment().subtract(1, 'days').startOf('day');
    const lastDayEnd = moment().subtract(1, 'days').endOf('day');
    const todayStart = moment().startOf('day');
    const todayEnd = moment().endOf('day');
    json.forEach((item: any) => {
      const t = item[0];
      const gas = item[1];
      const _t = moment(t).format('HH:mm');
      const _gas = Math.floor(gas);
      if (t > lastDayStart && t < lastDayEnd) {
        lastDayBTCPrices.push({
          t: t,
          v: gas * 1,
        });
      }
      if (t > todayStart && t < todayEnd) {
        btcPrices.push({
          t: t,
          v: gas * 1,
        });
      }
    });
    setOption(getOptions(lastDayBTCPrices, btcPrices));
  };
  useEffect(() => {
    loadBTC();
  }, []);

  const getOptions = (_lastdayGases: any, _todayGases: any) => {
    const option = {
      legend: {
        data: ['yestoday', 'today'],
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        show: true,
      },
      grid: {
        left: '-1%',
        right: '-0%',
        bottom: '0%',
        top: '10%',
      },
      xAxis: {
        type: 'category',
        boundaryGap: ['10%', '10%'],
        color: '#ffffff',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        data: _lastdayGases.map((item: any) => {
          return moment(item.t).format('HH:mm');
        }),
      },
      yAxis: {
        type: 'value',
        show: false,
        scale: true,
      },
      series: [
        {
          name: 'Last Day',
          type: 'line',
          symbol: 'none',
          color: '#A9DFD8',
          lineStyle: { width: 1.5 },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#A9DFD8',
              },
              {
                offset: 1,
                color: '#A9DFD800',
              },
            ]),
          },
          data: _lastdayGases.map((item: any) => {
            return { name: item.t, value: item.v };
          }),
        },
        {
          name: 'Today',
          type: 'line',
          symbol: 'none',
          color: '#6047FC',
          lineStyle: { width: 1.5 },

          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#6047FC',
              },
              {
                offset: 1,
                color: '#6047FC00',
              },
            ]),
          },
          endLabel: {
            show: true,
            backgroundColor: '#FFFFFF',
            shadowColor: '#ccc',
            shadowBlur: 5,
            color: '#444',
            padding: [5, 5],
            borderRadius: 5,
            fontSize: 12,
            lineHeight: 12,
            align: 'center',
            offset: [0, -2],
            verticalAlign: 'bottom',
            formatter: (d: any) => {
              return `${d.value} `;
            },
          },
          data: _todayGases.map((item: any) => {
            return { name: item.t, value: item.v };
          }),
        },
      ],
    };
    return option;
  };

  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ width: '100%', height: '60px' }}
      />
    </Box>
  );
}
