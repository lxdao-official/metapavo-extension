import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { Switch, Tooltip } from '@nextui-org/react';
import globalEvent from 'extension-common/src/EventBus';
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
import KOLs from '../modules/KOLs';
import MyNFTs from '../modules/MyNFTs';
import ReadLaters from '../modules/ReadLaters';
import TopSites from '../modules/TopSites';
import VisitHistories from '../modules/VisitHistories';

const allModules = [
  'TopSites',
  'CollectedNFTs',
  'CoinPrices',
  'InstallDAPPs',
  'VisitHistories',
  'ReadLaters',
  'KOLs',
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

  const [myfavs_two_line, setMyFavsTwoLine] = useState<boolean>(false);

  useEffect(() => {
    const config = !!localStorage.getItem('myfavs_two_line');
    setMyFavsTwoLine(config);
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
            {item === 'TopSites' && (
              <CardModule
                title={
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>{getLang('TopSites')}</div>
                    <Tooltip content={getLang('topsite_warn')}>
                      <HelpOutlineIcon
                        style={{ fontSize: '14px', marginLeft: '5px' }}
                      />
                    </Tooltip>
                  </div>
                }
                id="TopSites"
                index={i}
                moveCard={moveCard}
              >
                <TopSites />
              </CardModule>
            )}
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
            {item === 'KOLs' && (
              <CardModule
                title={'KOLs'}
                id="KOLs"
                index={i}
                moveCard={moveCard}
              >
                <KOLs />
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
                      fontSize: '12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        fontWeight: 400,
                      }}
                    >
                      <Switch
                        color="primary"
                        checked={myfavs_two_line}
                        size="xs"
                        style={{
                          verticalAlign: '-5.5px',
                          marginRight: '4px',
                        }}
                        onChange={(e) => {
                          setMyFavsTwoLine(e.target.checked);
                          localStorage.setItem(
                            'myfavs_two_line',
                            e.target.checked ? '1' : '',
                          );
                          globalEvent.emit('reloadFavs');
                        }}
                      ></Switch>
                      <span>{getLang('display_two_line')}</span>
                    </div>
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
