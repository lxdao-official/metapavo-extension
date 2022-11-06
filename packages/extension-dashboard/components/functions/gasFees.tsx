import { Box, Grid } from '@mui/material';
import { graphic } from 'echarts';
import ReactECharts from 'echarts-for-react';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function GasFees() {
  const [baseGas, setBaseGas] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [option, setOption] = useState<any>({});
  const loadGas = async () => {
    const r3 = await fetch(
      'https://app.defisaver.com/api/gas-price/1559/current',

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const json3 = await r3.json();
    if (
      json3.blockPrices &&
      json3.blockPrices.length &&
      json3.blockPrices[0].baseFeePerGas
    ) {
      const _nowGas = Math.floor(json3.blockPrices[0].baseFeePerGas);
      setBaseGas(_nowGas);
    }

    if (json3.maxPrice) {
      const _nowGas = Math.floor(json3.maxPrice);
      setMaxPrice(_nowGas);
    }

    const r4 = await fetch(
      'https://app.defisaver.com/api/gas-price/1559/history?days=2',

      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const json4 = await r4.json();
    console.log('fas', json3);
    const lastDayGases: any = [];
    const todayGases: any = [];
    const lastDayStart = moment().subtract(1, 'days').startOf('day');
    const lastDayEnd = moment().subtract(1, 'days').endOf('day');
    const todayStart = moment().startOf('day');
    const todayEnd = moment().endOf('day');
    if (json4 && json4.history) {
      json4.history.forEach((item: any) => {
        const t = item[0];
        const gas = item[1];
        if (t > lastDayStart && t < lastDayEnd) {
          lastDayGases.push({
            t: t,
            v: gas,
          });
        }
        if (t > todayStart && t < todayEnd) {
          todayGases.push({
            t: t,
            v: gas,
          });
        }
      });
    }

    setOption(getOptions(lastDayGases, todayGases));
  };
  useEffect(() => {
    loadGas();
  }, []);

  const getOptions = (_lastdayGases: any, _todayGases: any) => {
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1A161C',
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
        data: [],
      },
      yAxis: {
        type: 'value',
        show: false,
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
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div
            style={{
              background: '#fff',
              textAlign: 'center',
              fontFamily: 'Montserrat,sans-serif',
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: '10px',
                border: '1px solid #efefef',
                color: '#101010',
                fontSize: '12px',
                padding: '15px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: '#6047FC',
                  fontSize: '30px',
                  lineHeight: '30px',
                }}
              >
                {baseGas}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  gwei
                </span>
              </div>
            </div>
            <div
              style={{
                color: '#101010',
                fontSize: '16px',
                lineHeight: '30px',
              }}
            >
              Base fee
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              background: '#fff',
              textAlign: 'center',
              fontFamily: 'Montserrat,sans-serif',
            }}
          >
            <div
              style={{
                background: '#fff',
                borderRadius: '10px',
                border: '1px solid #efefef',
                color: '#101010',
                fontSize: '12px',
                padding: '15px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: '#6047FC',
                  fontSize: '30px',
                  lineHeight: '30px',
                }}
              >
                {maxPrice}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  gwei
                </span>
              </div>
            </div>
            <div
              style={{
                color: '#101010',
                fontSize: '16px',
                lineHeight: '30px',
              }}
            >
              Max fee
            </div>
          </div>
        </Grid>
      </Grid>
      <ReactECharts
        option={option}
        notMerge={true}
        lazyUpdate={true}
        style={{ width: '100%', height: '80px' }}
      />
    </Box>
  );
}
