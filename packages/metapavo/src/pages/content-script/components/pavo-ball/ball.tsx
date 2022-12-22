import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import { Box } from '@mui/material';
import { Button, Radio, Tooltip } from '@nextui-org/react';
import { AutoTextSize } from 'auto-text-size';
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
    refreshData,
    checkHide,
    gasType,
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
          gasType === 'GAS' ? 'metapavo-info-gas' : '',
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
                  padding: '6px 0px',
                  width: '220px',
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
                      margin: '3px',
                      marginTop: '8px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      color: '#444',
                      alignItems: 'center',
                      padding: '3px 8px',
                      paddingBottom: '8px',
                      cursor: 'pointer',
                      border: '1px dotted #ccc',
                      '&:hover': {
                        background: '#efefef',
                      },
                    }}
                  >
                    <div
                      style={{
                        lineHeight: '30px',
                        color: '#999',
                        fontSize: '12px',
                      }}
                    >
                      {getLang('choose_display_info')}
                    </div>
                    <Radio.Group
                      defaultValue={gasType}
                      size="xs"
                      orientation="horizontal"
                      onChange={(e) => {
                        chrome.storage.local.set({
                          display_info: e,
                        });
                        setTimeout(() => {
                          refreshData();
                        }, 500);
                      }}
                    >
                      <Radio value="GAS">GAS</Radio>
                      <Radio value="BTCBUSD">BTC</Radio>
                      <Radio value="ETHBUSD">ETH</Radio>
                    </Radio.Group>
                  </Box>
                </Box>
                <Box style={{}}>
                  <Box
                    sx={{
                      margin: '3px',
                      marginTop: '8px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#999',
                      alignItems: 'center',
                      padding: '8px 8px',
                      cursor: 'pointer',
                      lineHeight: '20px',
                      border: '1px dotted #ccc',
                    }}
                  >
                    <div>{getLang('ctrl_shift_f')}</div>
                    <div
                      style={{
                        marginTop: '5px',
                      }}
                    >
                      {getLang('press_to_move')}
                    </div>
                  </Box>
                </Box>
              </div>
            }
            placement="leftStart"
          >
            <div id="metapavo-gas-text">
              <div className="auto-size-text">
                <AutoTextSize maxFontSizePx={20}>{gas}</AutoTextSize>
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 'normal',
                  opacity: '0.8',
                  transform: 'scale(0.7)',
                  display: 'block',
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                {gasType}
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
