import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import globalEvent from 'extension-common/src/EventBus';
import { dapps } from 'extension-common/src/apis';
import { addViewLog } from 'extension-common/src/apis/dapps_api';
import { IKOL } from 'extension-common/src/apis/kol_api';

import config from '../../config';
import { DappCardRoot } from '../styles';
import Pick from './Pick';

export default function KolCard(props: {
  kol: IKOL;
  showPick?: boolean;
  onPick?: (kol: IKOL) => void;
}) {
  const blankImage = chrome.runtime.getURL('images/placeholder.png');
  const toLink = (link: string) => {
    window.location.href = link;
  };
  return (
    <DappCardRoot>
      <ListItem
        disablePadding
        sx={{
          background: '#fff',
          borderRadius: '5px',
          border: '1px solid #efefef',
          position: 'relative',
          marginBottom: '0',
          '& .icon': {
            display: 'none',
          },
          '&:hover': {
            '& .icon': {
              display: 'block',
            },
          },
        }}
        onClick={() => {
          toLink('https://twitter.com/' + props.kol.username);
        }}
        title={props.kol.name}
      >
        <ListItemButton style={{ padding: '5px 10px' }}>
          <ListItemIcon
            style={{
              minWidth: '20px',
              width: '20px',
              marginRight: '8px',
            }}
          >
            <img
              src={props.kol.avatar || blankImage}
              style={{
                height: '20px',
                width: '20px',

                background: '#f7f7f7',
                borderRadius: '5px',
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = blankImage;
              }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <div>
                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    height: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {props.kol.name}{' '}
                </div>
                <div
                  style={{
                    display: 'flex',
                    fontSize: '12px',
                    lineHeight: '20px',
                    maxHeight: '40px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <div
                    style={{
                      marginRight: '15px',
                    }}
                  >
                    <span
                      style={{
                        color: '#999',
                        paddingRight: '10px',
                      }}
                    >
                      followers:
                    </span>
                    {props.kol.followers}
                  </div>
                  {/*<div*/}
                  {/*  style={{*/}
                  {/*    marginRight: '15px',*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  <span*/}
                  {/*    style={{*/}
                  {/*      color: '#999',*/}
                  {/*    }}*/}
                  {/*  >*/}
                  {/*    tags:*/}
                  {/*  </span>*/}
                  {/*  {props.kol.tags.split(',').map((t) => (*/}
                  {/*    <span key={t}>{t}</span>*/}
                  {/*  ))}*/}
                  {/*</div>*/}
                </div>
              </div>
            }
          ></ListItemText>
        </ListItemButton>
      </ListItem>
      {props.showPick ? (
        <Pick
          onPick={function (e: string): void {
            globalEvent.emit('pick_kol', props.kol);
          }}
          style={{
            position: 'absolute',
            bottom: '3px',
            right: '9px',
            cursor: 'pointer',
          }}
        />
      ) : null}
    </DappCardRoot>
  );
}
