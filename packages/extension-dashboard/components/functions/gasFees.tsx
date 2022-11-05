import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { dapps, user_dapps } from '../../utils/apis';
import { getUserDapps } from '../../utils/apis/nft_api';

export default function GasFees() {
  const [baseGas, setBaseGas] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
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
  };
  useEffect(() => {
    loadGas();
  }, []);
  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
                  lineHeight: '70px',
                }}
              >
                {baseGas}
                <div
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  gwei
                </div>
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
        <Grid item xs={4}>
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
                  lineHeight: '70px',
                }}
              >
                {maxPrice}
                <div
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  gwei
                </div>
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
    </Box>
  );
}
