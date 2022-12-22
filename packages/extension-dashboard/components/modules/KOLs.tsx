import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Button,
  Dropdown,
  Input,
  Modal,
  Text,
  Tooltip,
  User,
} from '@nextui-org/react';
import globalEvent from 'extension-common/src/EventBus';
import { IKOL, getKOLsByIds } from 'extension-common/src/apis/kol_api';
import { collectedObjects } from 'extension-common/src/apis/object_api';
import { getLang } from 'extension-common/src/lang';
import {
  getListConfig,
  setListConfig,
} from 'extension-common/src/localStore/store';
import { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

import { UserContext } from '../../context/useUser';
import { KolDetailCard } from '../cards/KolDetailCard';
import NoLogin from './common/NoLogin';

export default function KOLs() {
  const [kols, setKols] = useState<IKOL[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useContext(UserContext);
  async function loadKols() {
    const cache = getListConfig('user_kols', []);
    if (cache && cache.length) {
      setKols(cache);
    }
    const res = await collectedObjects('kol', 1, 50);
    if (res) {
      const kolIds = res.map((r: any) => r.object_id);
      const _kols = await getKOLsByIds(kolIds);
      if (_kols && _kols.length) {
        setKols(_kols);
        setListConfig('user_kols', _kols);
      } else {
        setKols([]);
        setListConfig('user_kols', []);
      }
    }
  }
  useEffect(() => {
    loadKols();
    globalEvent.on('pick_kol_success', () => {
      loadKols();
    });
  }, []);
  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      {token ? (
        <>
          {kols.length == 0 && (
            <div
              style={{
                textAlign: 'left',
                width: '100%',
                fontSize: '14px',
                lineHeight: '50px',
                paddingLeft: '10px',
              }}
            >
              {getLang('no_kols')}
            </div>
          )}
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexWrap: 'nowrap',
            }}
          >
            <Grid container spacing={1}>
              {kols.map((u) => {
                return (
                  <Grid
                    item
                    xs={3}
                    sx={{
                      overflow: 'hidden',
                    }}
                  >
                    <KolDetailCard kol={u} isCollected={true} />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </>
      ) : (
        <NoLogin />
      )}
    </Box>
  );
}
