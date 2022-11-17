import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { getCheckinStatus, me } from '../../utils/apis/users_api';

export default function Score() {
  const [score, setScore] = useState(0);
  const [checkinStatus, setCheckinStatus] = useState<{
    checked: boolean;
    unbreak_days: number;
  }>({
    checked: false,
    unbreak_days: 0,
  });
  async function loadScoreInfo() {
    const info = await me();
    if (info) {
      setScore(info.score);
    }
  }
  async function loadCheckinStatus() {
    const info = await getCheckinStatus();
    if (info) {
      setCheckinStatus(info);
    }
  }

  useEffect(() => {
    loadScoreInfo();
    loadCheckinStatus();
  }, []);
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
                padding: '10px',
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
                {score}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  P
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
              Your Pavo Score
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
                padding: '10px',
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
                {checkinStatus.unbreak_days}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  天
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
              已连续签到
            </div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
