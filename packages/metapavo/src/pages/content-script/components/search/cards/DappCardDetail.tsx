import { dapps } from 'extension-common/src/apis';
import { addViewLog } from 'extension-common/src/apis/dapps_api';

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
    <div
      style={{
        background: '#fff',
        borderRadius: '10px',
        border: '1px solid #efefef',
        position: 'relative',
        marginBottom: '0',
        display: 'flex',
        alignItems: 'center',

        // '& .icon': {
        //   display: 'none',
        // },
        // '&:hover': {
        //   '& .icon': {
        //     display: 'block',
        //   },
        // },
        padding: '5px 10px',
      }}
      onClick={() => {
        toLink();
      }}
    >
      <div
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
      </div>
      <div>
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
      </div>
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
    </div>
  );
}
