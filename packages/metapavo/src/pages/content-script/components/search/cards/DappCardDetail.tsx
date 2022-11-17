import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { dapps } from '../utils/apis';
import { addViewLog } from '../utils/apis/dapps_api';
import Pick from './Pick';

export default function DappCardDetail(props: {
  dapp: dapps;
  showPick?: boolean;
  onPick?: (dapp: dapps) => void;
}) {
  const blankImage = chrome.runtime.getURL('images/placeholder.png');
  const toLink = () => {
    addViewLog(props.dapp);
    window.location.href = `${process.env.NEXT_PUBLIC_APIBASE}/dapps/jump/${props.dapp.id}`;
  };
  return (
    <ListItem
      disablePadding
      sx={{
        background: '#fff',
        borderRadius: '10px',
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
        toLink();
      }}
    >
      <ListItemButton style={{ padding: '5px 10px' }}>
        <ListItemIcon
          style={{
            minWidth: '40px',
            width: '40px',
            marginRight: '8px',
          }}
        >
          <img
            src={props.dapp.logo || blankImage}
            style={{
              height: '40px',
              width: '40px',

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
            <div
              style={{
                fontSize: '15px',
                fontWeight: 500,
                lineHeight: '20px',
                height: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#444',
              }}
            >
              {props.dapp.title}{' '}
            </div>
          }
          secondary={
            <div
              style={{
                fontSize: '12px',
                fontWeight: 300,
                lineHeight: '20px',
                height: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#999',
              }}
            >
              {props.dapp.desc}{' '}
            </div>
          }
        ></ListItemText>
        {props.showPick ? (
          <Pick
            style={{
              display: 'flex',
              alignItems: 'center',
              alignContent: 'center',
            }}
            onPick={function (e: string): void {
              // globalEvent.emit("pick_dapp", props.dapp);
            }}
          />
        ) : null}
      </ListItemButton>
    </ListItem>
  );
}
