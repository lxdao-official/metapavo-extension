import { useEffect, useState } from 'react';

import { CheckinContext, useCheckin } from '../../context/useCheckin';
import { getLang } from '../../utils/lang';
import { getListConfig, setListConfig } from '../../utils/localStore/store';
import CardModule from '../CardModule';
import CheckIn from '../functions/CheckIn';
import CoinPrices from '../modules/CoinPrices';
import GasFees from '../modules/GasFees';
import MyNFTs from '../modules/MyNFTs';
import Score from '../modules/Score';

const allModules = ['Score', 'GasFees', 'CoinPrices'];
export default function RightPanel() {
  const [items, setItems] = useState<string[]>([]);
  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const dragCard = items[dragIndex];
    const dropCard = items[hoverIndex];
    const newItems = items.map((item, index) => {
      if (index === dragIndex) {
        return dropCard;
      }
      if (index === hoverIndex) {
        return dragCard;
      }
      return item;
    });
    setItems(newItems);
    setListConfig('dashboard_items_right', newItems);
  };
  useEffect(() => {
    const config = getListConfig('dashboard_items_right', allModules);
    if (config) {
      allModules.forEach((m) => {
        if (!config.includes(m)) {
          config.push(m);
        }
      });
      setItems(config);
    }
  }, []);
  const checkInContext = useCheckin();
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {items.map((item, i) => {
        return (
          <>
            {item === 'Score' && (
              <CheckinContext.Provider value={checkInContext}>
                <CardModule
                  title="Score and Invites"
                  id="Score"
                  index={i}
                  moveCard={moveCard}
                  extra={
                    <div
                      style={{
                        display: 'flex',
                      }}
                    >
                      <CheckIn />
                    </div>
                  }
                >
                  <Score></Score>
                </CardModule>
              </CheckinContext.Provider>
            )}
            {item === 'GasFees' && (
              <CardModule
                title="Gas"
                extra={<a href="https://ultrasound.money/">What's happening</a>}
                id="GasFees"
                index={i}
                moveCard={moveCard}
              >
                <GasFees></GasFees>
              </CardModule>
            )}
            {item === 'CoinPrices' && (
              <CoinPrices
                id="CoinPrices"
                index={i}
                moveCard={moveCard}
              ></CoinPrices>
            )}
            {item === 'MyNFTs' && (
              <CardModule
                title={getLang('MyNFTs')}
                extra={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '0 15px',
                    }}
                  >
                    <a href="https://opensea.io/account">OpenSea</a>
                  </div>
                }
                id="MyNFTs"
                index={i}
                moveCard={moveCard}
              >
                <MyNFTs />
              </CardModule>
            )}
          </>
        );
      })}
    </div>
  );
}
