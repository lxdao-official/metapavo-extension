import { Box, Button, Grid, Input, NoSsr } from '@mui/material';
import { getLang } from 'extension-common/src/lang';
import { useEffect, useState } from 'react';

import CardModule from '../../components/CardModule';
import CoinPrices from '../modules/CoinPrices';
import CollectedNFTs from '../modules/CollectedNFTs';
import GasFees from '../modules/GasFees';
import InstallDAPPs from '../modules/InstallDAPPs';
import ReadLaters from '../modules/ReadLaters';
import Search from '../modules/Search';
import VisitHistories from '../modules/VisitHistories';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const IndexComponent = () => {
  return (
    <>
      <Search />
      <Grid
        container
        spacing={2}
        style={{ width: '1328px', margin: '10px auto 40px auto' }}
      >
        <Grid item xs={8}>
          <LeftPanel />
        </Grid>
        <Grid item xs={4}>
          <RightPanel />
        </Grid>
      </Grid>
    </>
  );
};

export default IndexComponent;
