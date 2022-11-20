import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Grid } from '@mui/material';
import { Button, Tooltip } from '@nextui-org/react';
import ClipboardJS from 'clipboard';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { CheckinContext } from '../../context/useCheckin';
import { generateTodayInvites } from '../../utils/apis/users_api';
import { getLang } from '../../utils/lang';

export default function Score() {
  const {
    loadScoreInfo,
    info,
    setInfo,
    awailableInvites,
    loadAwailableInvites,
  } = useContext(CheckinContext);

  async function generate() {
    const loading = toast.loading('Generating...');
    try {
      const res = await generateTodayInvites();
      toast.success('Generate success');
      loadAwailableInvites();
    } catch (e) {
      toast.error('Generate failed');
    }
    toast.dismiss(loading);
  }
  useEffect(() => {
    loadScoreInfo();
    loadAwailableInvites();
  }, []);

  const copyRef = useRef<any>(null);
  useEffect(() => {
    if (copyRef.current) {
      const clip = new ClipboardJS(
        document.getElementsByClassName('copy') as any,
        {
          // target: () => inputRef.current!,
        },
      );
      clip.on('success', function () {
        toast.success('copy success');
      });
      clip.on('error', () => {
        toast.error('copy fail');
      });
    }
  }, [copyRef.current]);
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
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: '#6047FC',
                  fontSize: '20px',
                  lineHeight: '30px',
                }}
              >
                {info.score}
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
                <HelpOutlineIcon
                  fontSize={'small'}
                  style={{
                    marginLeft: '4px',
                    fontSize: '12px',
                    verticalAlign: '-2px',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                color: '#444',
                fontSize: '14px',
                lineHeight: '30px',
              }}
            >
              {getLang('your_pavo_score')}
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
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: '#6047FC',
                  fontSize: '20px',
                  lineHeight: '30px',
                }}
              >
                {info.checkinStatus.unbreak_days}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  {getLang('days')}
                </span>
              </div>
            </div>
            <div
              style={{
                color: '#444',
                fontSize: '14px',
                lineHeight: '30px',
              }}
            >
              {getLang('unbreak_checkin_days')}
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
                padding: '10px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  color: '#6047FC',
                  fontSize: '20px',
                  lineHeight: '30px',
                }}
              >
                {info.inviteCount}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                  }}
                >
                  {getLang('Person')}
                </span>
                <HelpOutlineIcon
                  fontSize={'small'}
                  style={{
                    marginLeft: '4px',
                    fontSize: '12px',
                    verticalAlign: '-2px',
                  }}
                />
              </div>
            </div>
            <div
              style={{
                color: '#444',
                fontSize: '14px',
                lineHeight: '30px',
              }}
            >
              {getLang('invite_count')}
            </div>
          </div>
        </Grid>
      </Grid>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          lineHeight: '30px',
          marginTop: '10px',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            color: '#444',
          }}
        >
          {getLang('Invites_code')}
        </span>
        {awailableInvites.length ? (
          awailableInvites.map((item, index) => {
            return (
              <div ref={copyRef}>
                <Tooltip placement="top" content={'click to copy'}>
                  <a
                    style={{
                      fontSize: '12px',
                    }}
                    className="copy"
                    data-clipboard-text={
                      'metapavo invite link: https://metapavo.xyz/invite/' +
                      item.id
                    }
                  >
                    {item.id}
                  </a>
                </Tooltip>
              </div>
            );
          })
        ) : (
          <div>
            <div
              style={{
                fontSize: '14px',
                color: '#444',
              }}
            >
              {getLang('no_invite_code')}
              <a onClick={generate} style={{ marginLeft: '20px' }}>
                {getLang('generate')}
              </a>
            </div>
          </div>
        )}
      </div>
    </Box>
  );
}
