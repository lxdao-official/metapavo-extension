import { Box, Grid } from '@mui/material';
import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';

export default function CoinPriceCard(props: { symbol: string }) {
  const [option, setOption] = useState<any>({});
  const chartRef = useRef<any>();
  const loadBTC = async () => {
    const res = await fetch(
      `https://api.binance.com/api/v3/klines?symbol=${props.symbol}&interval=15m`,
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
    const lastDayStart = moment()
      .subtract(1, 'days')
      .startOf('day')
      .toDate()
      .getTime();
    const lastDayEnd = moment()
      .subtract(1, 'days')
      .endOf('day')
      .toDate()
      .getTime();
    const todayStart = moment().startOf('day').toDate().getTime();
    const todayEnd = moment().endOf('day').toDate().getTime();
    json.forEach((item: any) => {
      const t = Number(item[0]);
      const gas = item[1];
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

  const labelLayout = (params: any) => {
    const chartWidth = chartRef.current?.clientWidth;
    const labelRect = params.labelRect;
    const labelX = labelRect.x;
    const labelWidth = labelRect.width;
    const overflow = labelWidth + labelX > chartWidth;
    const labelY = labelRect.y;
    console.log('labelY', labelY);
    let y = labelY;
    let x = labelX;

    if (labelY < labelRect.height) {
      y = labelRect.height;
    }
    if (labelX < 0) {
      x = 0;
    }

    // if (labelY + labelRect.height > params.rect.height) {
    //   y = params.rect.height - labelRect.height;
    // }

    return {
      x: overflow ? chartWidth - labelWidth : x,
      y: y,
    };
  };

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
          animation: false,
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
          labelLayout,
        },
      ],
    };
    return option;
  };

  return (
    <Box
      style={{
        width: '100%',
      }}
    >
      <div
        style={{
          fontSize: '14px',
          lineHeight: '30px',
        }}
      >
        {props.symbol}
      </div>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        ref={chartRef}
        style={{ width: '100%', height: '60px' }}
      />
    </Box>
  );
}
