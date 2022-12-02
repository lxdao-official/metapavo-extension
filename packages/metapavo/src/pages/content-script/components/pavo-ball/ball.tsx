import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { Box } from '@mui/material';
import { Button, Tooltip } from '@nextui-org/react';
import { links } from 'extension-common/src/apis';
import { getLogo } from 'extension-common/src/getLogo';
import { getLang } from 'extension-common/src/lang';
import { useEffect, useState } from 'react';

import AddLinksModal from '../search/cards/AddLinksModal';
import DangerPopup from './status/danger';
import DappPopup from './status/dapp';
import SuccessPopup from './status/success';
import useBallStore from './store/useBallStore';
import { GasBox, RootElement } from './styles';

let inited = false;

function Ball() {
  const {
    hide,
    setHide,
    rootRef,
    gasRef,
    useG,
    gas,
    activeDapp,
    noDisplay7,
    checkHide,
    init,
  } = useBallStore();

  const [showAddLinksModal, setShowAddLinksModal] = useState(false);
  const [link, setlink] = useState<{
    title: string;
    url: string;
    icon: string | null;
  }>();
  useEffect(() => {
    if (!inited) init();
    inited = true;
    checkHide();
  }, []);

  return (
    <>
      <RootElement
        id="metapavo-box"
        className={[
          'web3-spin',
          useG.detectStatus === 'danger' ? 'metapavo-main-status-danger' : '',
          useG.detectStatus === 'success' ? 'metapavo-main-status-success' : '',
          useG.addRootClass,
        ].join(' ')}
        ref={rootRef}
        style={{
          display: !hide ? 'block' : 'none',
        }}
      >
        <GasBox
          id="metapavo-box-gas"
          ref={gasRef}
          style={{ userSelect: 'none' }}
          onDoubleClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setHide(true);
            setTimeout(() => {
              setHide(false);
            }, 10000);
          }}
        >
          <Tooltip
            content={
              <div
                style={{
                  padding: '3px 0px',
                  width: '200px',
                }}
              >
                <Box
                  style={{}}
                  onClick={async () => {
                    setShowAddLinksModal(true);
                    setlink({
                      title: document.title,
                      url: window.location.href,
                      icon: await getLogo(window.location.host),
                    });
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      margin: '3px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#444',
                      alignItems: 'center',
                      padding: '10px 8px',
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#efefef',
                      },
                    }}
                  >
                    <AddCircleOutlineIcon
                      style={{
                        fontSize: '20px',
                        marginRight: '10px',
                        color: '#5B28EB',
                      }}
                    />
                    <div>{getLang('add_to_read_later')}</div>
                  </Box>
                </Box>
                <Box
                  style={{}}
                  onClick={() => {
                    noDisplay7();
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      margin: '3px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#444',
                      alignItems: 'center',
                      padding: '10px 8px',
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#efefef',
                      },
                    }}
                  >
                    <BlockIcon
                      style={{
                        fontSize: '20px',
                        marginRight: '10px',
                        color: '#5B28EB',
                      }}
                    />
                    <div> {getLang('nodisplay7')}</div>
                  </Box>
                </Box>
                <Box style={{}}>
                  <Box
                    sx={{
                      display: 'flex',
                      margin: '3px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#999',
                      alignItems: 'center',
                      padding: '10px 8px',
                      cursor: 'pointer',
                      '&:hover': {
                        background: '#efefef',
                      },
                    }}
                  >
                    <div> {getLang('ctrl_shift_f')}</div>
                  </Box>
                </Box>
              </div>
            }
            placement="leftStart"
          >
            <div id="metapavo-gas-text">
              {gas}
              <br />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '400',
                  opacity: '0.8',
                  transform: 'scale(0.7)',
                  display: 'block',
                  marginTop: '4px',
                  color: '#fff',
                }}
              >
                GAS
              </span>
            </div>
          </Tooltip>
        </GasBox>
        {activeDapp && useG.addRootClass === 'metapavo-main-box-dapp' && (
          <DappPopup dapp={activeDapp} />
        )}
        <DangerPopup
          state={
            useG.addRootClass === 'metapavo-main-box-danger' ? 'show' : 'hide'
          }
        />
        <SuccessPopup
          state={
            useG.addRootClass === 'metapavo-main-box-success' ? 'show' : 'hide'
          }
        />
        <AddLinksModal
          showModalState={showAddLinksModal}
          link={link as links}
        />
      </RootElement>
    </>
  );
}

export default Ball;
