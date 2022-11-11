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
