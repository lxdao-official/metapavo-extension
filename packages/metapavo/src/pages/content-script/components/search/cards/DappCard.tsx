import { dapps } from 'extension-common/src/apis';
import { addViewLog } from 'extension-common/src/apis/dapps_api';
import { useState } from 'react';

import AddDappModal from './AddDappModal';
import Pick from './Pick';

export default function DappCard(props: {
  dapp: dapps;
  showPick?: boolean;
  onPick?: (dapp: dapps) => void;
}) {
  const blankImage = chrome.runtime.getURL('images/placeholder.png');
  const toLink = () => {
    addViewLog(props.dapp);
    window.location.href = `${process.env.NEXT_PUBLIC_APIBASE}/dapps/jump/${props.dapp.id}`;
  };
  const [showModalState, setshowModalState] = useState(false);
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '5px',
        border: '1px solid #efefef',
        position: 'relative',
        marginBottom: '0',
        display: 'flex',
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
      </div>

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
      {props.showPick ? (
        <Pick
          style={{
            display: 'flex',
            alignItems: 'center',
            alignContent: 'center',
          }}
          onPick={function (e: string): void {
            // globalEvent.emit("pick_dapp", props.dapp);
            setshowModalState(true);
          }}
        />
      ) : null}
      <AddDappModal dapp={props.dapp} showModalState={showModalState} />
    </div>
  );
}
