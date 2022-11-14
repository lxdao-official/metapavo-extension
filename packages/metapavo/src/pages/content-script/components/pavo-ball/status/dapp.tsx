import { Button } from '@nextui-org/react';
import { useContext, useState } from 'react';

import { dapps } from '../../../../../utils/apis';
import { getLang } from '../../../../../utils/lang';
import { GlobalContext } from '../../../context/useGlobal';
import AddDappModal from '../../search/cards/AddDappModal';
import DappCardDetail from '../../search/cards/DappCardDetail';
import { DappPopupRootElement } from '../styles';

export default function DappPopup(props: {
  dapp: { installed: boolean } & dapps;
}) {
  const [showModalState, setshowModalState] = useState(false);
  const { setAddRootClass } = useContext(GlobalContext);
  return (
    <DappPopupRootElement>
      <div
        style={{
          lineHeight: '30px',
          fontSize: '13px',
          color: '#444',
          fontWeight: 300,
          textAlign: 'left',
        }}
      >
        {getLang('recognize_dapp')}
      </div>
      <DappCardDetail dapp={props.dapp} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        {props.dapp.installed ? (
          <Button
            style={{
              marginTop: '10px',
              minWidth: '100px',
            }}
            ghost={true}
            size="sm"
          >
            {getLang('installed_dapp')}
          </Button>
        ) : (
          <Button
            style={{
              marginTop: '10px',
              minWidth: '100px',
            }}
            size="sm"
            onClick={() => {
              setshowModalState(true);
            }}
          >
            {getLang('install_dapp')}
          </Button>
        )}
      </div>
      <AddDappModal dapp={props.dapp} showModalState={showModalState} />
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setAddRootClass('');
        }}
        className="mp-success-close"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 7L17 17"
            stroke="#D1D0D6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 17L17 7"
            stroke="#D1D0D6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </DappPopupRootElement>
  );
}
