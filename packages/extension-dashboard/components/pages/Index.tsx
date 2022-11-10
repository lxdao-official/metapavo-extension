import { Box, Button, Grid, Input, NoSsr } from '@mui/material';
import { useEffect, useState } from 'react';

import CardModule from '../../components/CardModule';
import { getLang } from '../../utils/lang';
import CoinPrices from '../functions/CoinPrices';
import CollectedNFTs from '../functions/CollectedNFTs';
import GasFees from '../functions/GasFees';
import InstallDAPPs from '../functions/InstallDAPPs';
import ReadLaters from '../functions/ReadLaters';
import Search from '../functions/Search';
import VisitHistories from '../functions/VisitHistories';

const IndexComponent = () => {
  const [items, setItems] = useState([
    'InstallDAPPs',
    'VisitHistories',
    'ReadLaters',
    'CollectedNFTs',
  ]);
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
    localStorage.setItem('dashboard_items_left', JSON.stringify(newItems));
  };
  useEffect(() => {
    const config = localStorage.getItem('dashboard_items_left');
    if (config) {
      setItems(JSON.parse(config));
    }
  }, []);
  return (
    <>
      <Search />
      <Grid
        container
        spacing={2}
        style={{ width: '1328px', margin: '40px auto' }}
      >
        <Grid item xs={8}>
          {items.map((item, i) => {
            return (
              <>
                {item === 'InstallDAPPs' && (
                  <CardModule
                    title={getLang('My_Installed_DAPPs')}
                    extra={<a href="#">DAPP Store</a>}
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
                {item === 'VisitHistories' && (
                  <CardModule
                    title={getLang('DASHBOARD_History')}
                    id="VisitHistories"
                    index={i}
                    moveCard={moveCard}
                  >
                    <VisitHistories></VisitHistories>
                  </CardModule>
                )}
              </>
            );
          })}
        </Grid>
        <Grid item xs={4}>
          <CardModule
            title="Gas"
            extra={<a href="https://ultrasound.money/">What's happening</a>}
          >
            <GasFees></GasFees>
          </CardModule>
          <CoinPrices></CoinPrices>
        </Grid>
      </Grid>
    </>
  );
};

export default IndexComponent;
