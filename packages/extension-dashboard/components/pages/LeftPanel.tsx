import { Tooltip } from '@nextui-org/react';
import { getLang } from 'extension-common/src/lang';
import {
  getListConfig,
  setListConfig,
} from 'extension-common/src/localStore/store';
import { useEffect, useState } from 'react';

import CardModule from '../CardModule';
import CoinPrices from '../modules/CoinPrices';
import CollectedNFTs from '../modules/CollectedNFTs';
import InstallDAPPs from '../modules/InstallDAPPs';
import MyNFTs from '../modules/MyNFTs';
import ReadLaters from '../modules/ReadLaters';
import VisitHistories from '../modules/VisitHistories';

const allModules = [
  'InstallDAPPs',
  'CollectedNFTs',
  'CoinPrices',
  'VisitHistories',
  'ReadLaters',
  'MyNFTs',
];
export default function LeftPanel() {
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
    setListConfig('dashboard_items_left', newItems);
  };
  useEffect(() => {
    const config = getListConfig<string>('dashboard_items_left', allModules);
    // check config all exists
    allModules.forEach((m) => {
      if (!config.includes(m)) {
        config.push(m);
      }
    });
    if (config) {
      setItems(config);
    }
  }, []);
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {items.map((item, i) => {
        return (
          <>
            {item === 'InstallDAPPs' && (
              <CardModule
                title={getLang('My_Installed_DAPPs')}
                extra={
                  <Tooltip content={getLang('todo')}>
                    <a href="#">DAPP Store</a>
                  </Tooltip>
                }
                id="InstallDAPPs"
                index={i}
                moveCard={moveCard}
              >
                <InstallDAPPs />
              </CardModule>
            )}
            {item === 'CollectedNFTs' && (
              <CardModule
                title={getLang('My_Collected_NFTs')}
                extra={
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '0 15px',
                    }}
                  >
                    <a href="https://opensea.io/account">OpenSea</a>
                    <a href="https://www.gem.xyz">GEM</a>
                  </div>
                }
                id="CollectedNFTs"
                index={i}
                moveCard={moveCard}
              >
                <CollectedNFTs></CollectedNFTs>
              </CardModule>
            )}
            {item === 'CoinPrices' && (
              <CoinPrices
                id="CoinPrices"
                index={i}
                moveCard={moveCard}
              ></CoinPrices>
            )}
            {item === 'ReadLaters' && (
              <CardModule
                title={getLang('Read_Laters')}
                id="ReadLaters"
                index={i}
                moveCard={moveCard}
              >
                <ReadLaters></ReadLaters>
              </CardModule>
            )}
            {/* {item === 'VisitHistories' && (
              <CardModule
                title={getLang('DASHBOARD_History')}
                id="VisitHistories"
                index={i}
                moveCard={moveCard}
              >
                <VisitHistories></VisitHistories>
              </CardModule>
            )} */}
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
