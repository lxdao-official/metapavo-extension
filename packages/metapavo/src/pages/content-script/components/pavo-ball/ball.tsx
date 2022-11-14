import { Button, Tooltip } from '@nextui-org/react';
import { useEffect } from 'react';

import { getLang } from '../../../../utils/lang';
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
    addReadLater,
    checkHide,
    init,
  } = useBallStore();

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
                  padding: '5px 3px',
                }}
              >
                <div>
                  <Button
                    onClick={() => {
                      addReadLater();
                    }}
                    size="sm"
                    color="default"
                  >
                    {getLang('add_to_read_later')}
                  </Button>
                </div>
                <div
                  style={{
                    marginTop: '10px',
                  }}
                >
                  <Button
                    onClick={() => {
                      noDisplay7();
                    }}
                    size="sm"
                    color="default"
                  >
                    {getLang('nodisplay7')}
                  </Button>
                </div>
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
      </RootElement>
    </>
  );
}

export default Ball;
