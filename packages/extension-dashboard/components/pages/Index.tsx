import { Box, Grid, Input, NoSsr } from '@mui/material';
import { Button, Link, Modal, Text } from '@nextui-org/react';
import { getLang } from 'extension-common/src/lang';
import { useEffect, useState } from 'react';

import CardModule from '../../components/CardModule';
import Search from '../functions/Search';
import CoinPrices from '../modules/CoinPrices';
import CollectedNFTs from '../modules/CollectedNFTs';
import GasFees from '../modules/GasFees';
import InstallDAPPs from '../modules/InstallDAPPs';
import ReadLaters from '../modules/ReadLaters';
import VisitHistories from '../modules/VisitHistories';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

const IndexComponent = () => {
  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
    localStorage.setItem('welcome', '1');
  };
  useEffect(() => {
    if (!localStorage.getItem('welcome')) {
      setVisible(true);
    }
  }, []);
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
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            {getLang('welcome_to_pavo')}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>{getLang('welcome_t_1')}</Text>
          <Text>{getLang('welcome_t_2')}</Text>
          <Link
            href="https://metapavo.gitbook.io/whitepaper/"
            target={'_blank'}
          >
            {getLang('welcome_t_3')}
          </Link>
          <Link
            href="https://metapavo.gitbook.io/whitepaper/user-security-manual-zhong-wen"
            target={'_blank'}
          >
            {getLang('welcome_t_4')}
          </Link>
        </Modal.Body>
        <Modal.Footer>
          <Button auto onClick={closeHandler}>
            {getLang('welcome_ok')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IndexComponent;
