import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Box, Grid } from '@mui/material';
import { Button, Tooltip } from '@nextui-org/react';
import ClipboardJS from 'clipboard';
import { generateTodayInvites } from 'extension-common/src/apis/users_api';
import { getLang } from 'extension-common/src/lang';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { CheckinContext } from '../../context/useCheckin';

const POINT_DESC = getLang('score_desc');
const INVITE_DESC = getLang('invite_desc');
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
      toast.error('Generate failed!' + getLang('generate_invitecode_error'));
    }
    toast.dismiss(loading);
  }
  useEffect(() => {
    loadScoreInfo();
    loadAwailableInvites();
  }, []);

  const copyRef = useRef<any>(null);
  useEffect(() => {
    console.log('copyRef.current', copyRef.current);

    setTimeout(() => {
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
    }, 500);
  }, [awailableInvites.length]);

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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {info.score}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                    marginTop: '5px',
                  }}
                >
                  P
                </span>
                <Tooltip
                  content={POINT_DESC.split(';').map((d) => {
                    return <div>{d}</div>;
                  })}
                  placement="left"
                >
                  <HelpOutlineIcon
                    fontSize={'small'}
                    style={{
                      marginLeft: '4px',
                      fontSize: '12px',
                      verticalAlign: '-2px',
                      marginTop: '5px',
                    }}
                  />
                </Tooltip>
              </div>
            </div>
            <div
              style={{
                color: '#444',
                fontSize: '14px',
                lineHeight: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {info.checkinStatus.unbreak_days}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                    marginTop: '5px',
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {info.inviteCount}
                <span
                  style={{
                    color: '#999',
                    fontSize: '12px',
                    paddingLeft: '5px',
                    lineHeight: '20px',
                    marginTop: '5px',
                  }}
                >
                  {getLang('Person')}
                </span>
                <Tooltip
                  content={INVITE_DESC.split(';').map((d) => {
                    return <div>{d}</div>;
                  })}
                  placement="left"
                >
                  <HelpOutlineIcon
                    fontSize={'small'}
                    style={{
                      marginLeft: '4px',
                      fontSize: '12px',
                      verticalAlign: '-2px',
                      marginTop: '5px',
                    }}
                  />
                </Tooltip>
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
          flexWrap: 'wrap',
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
          <>
            {/* {awailableInvites.map((item, index) => {
              return (
                <a
                  style={{
                    fontSize: '12px',
                  }}
                >
                  {item.id}
                </a>
              );
            })} */}
            <Tooltip content={'click to copy'}>
              <a
                ref={copyRef}
                style={{
                  fontSize: '12px',
                }}
                className="copy"
                data-clipboard-text={`${getLang('invite_text_1')}

${awailableInvites
  .map((item) => {
    return 'https://metapavo.xyz/invite/' + item.id + getLang('invite_text_3');
  })
  .join(' \n')}

${getLang('invite_text_2')}`}
              >
                {getLang('copy_all_codes')} ({awailableInvites.length})
              </a>
            </Tooltip>
          </>
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
