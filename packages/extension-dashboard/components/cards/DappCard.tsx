import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import config from '../../config';
import globalEvent from '../../context/EventBus';
import { dapps } from '../../utils/apis';
import { addViewLog } from '../../utils/apis/dapps_api';
import Pick from './Pick';

export default function DappCard(props: {
  dapp: dapps;
  showPick?: boolean;
  onPick?: (dapp: dapps) => void;
}) {
  const blankImage = chrome.runtime.getURL('images/placeholder.png');
  const toLink = () => {
    addViewLog(props.dapp);
    window.location.href = `${config.baseURL}/dapps/jump/${props.dapp.id}`;
  };
  return (
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
        toLink();
      }}
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
            src={props.dapp.logo || blankImage}
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
            <div
              style={{
                fontSize: '12px',
                fontWeight: 500,
                lineHeight: '20px',
                height: '20px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {props.dapp.title}{' '}
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
              globalEvent.emit('pick_dapp', props.dapp);
            }}
          />
        ) : null}
      </ListItemButton>
    </ListItem>
  );
}
