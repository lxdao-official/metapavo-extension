import { Box, Button, Grid, Input, NoSsr } from '@mui/material';

import CardModule from '../../components/CardModule';
import CoinPrices from '../../components/functions/coinPrices';
import FavNFTModule from '../../components/functions/collectNFTs';
import GasFees from '../../components/functions/gasFees';
import InstallDAPPs from '../../components/functions/installDAPPs';
import ReadLaters from '../../components/functions/readLaters';
import VisitHistories from '../../components/functions/visitHistories';
import styles from '../../styles/Home.module.css';
import { getLang } from '../../utils/lang';

const IndexComponent = () => {
  return (
    <>
      <div className={styles.searchBg}>
        <Box>
          <input
            placeholder="Search by keyword/address/ens/dapp name"
            style={{
              width: '700px',
              margin: '0 auto',
              borderRadius: '20px',
              height: '40px',
              background: '#fff',
              border: 'none',
              textAlign: 'center',
              fontSize: '14px',
            }}
          />
        </Box>
      </div>
      <Grid
        container
        spacing={2}
        style={{ width: '1328px', margin: '40px auto' }}
      >
        <Grid item xs={8}>
          <CardModule
            title={getLang('My_Installed_DAPPs')}
            extra={<a href="#">DAPP Store</a>}
          >
            <InstallDAPPs></InstallDAPPs>
          </CardModule>
          <CardModule title={getLang('My_Collected_NFTs')}>
            <FavNFTModule></FavNFTModule>
          </CardModule>
          <CardModule title={getLang('Read_Laters')}>
            <ReadLaters></ReadLaters>
          </CardModule>
          <CardModule title={getLang('DASHBOARD_History')}>
            <VisitHistories></VisitHistories>
          </CardModule>
        </Grid>
        <Grid item xs={4}>
          <CardModule
            title="Gas"
            extra={<a href="https://ultrasound.money/">What's happening</a>}
          >
            <GasFees></GasFees>
          </CardModule>
          <CardModule title="Token Price" extra={<a href="#">Setting</a>}>
            <CoinPrices
              symbols={['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'FTTUSDT']}
            ></CoinPrices>
          </CardModule>
        </Grid>
      </Grid>
    </>
  );
};

export default IndexComponent;
