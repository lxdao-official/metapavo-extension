import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { dapps, user_dapps } from '../../utils/apis';
import { getUserDapps } from '../../utils/apis/nft_api';

type UserDapp = user_dapps & {
  dapp: dapps;
};
export default function InstallDAPPs() {
  const [userdapps, setuserdapps] = useState<UserDapp[]>([]);
  const loadFavs = async () => {
    try {
      const cache = localStorage.getItem('userdapps');
      if (cache) {
        const cacheJson = JSON.parse(cache);
        if (cacheJson.length) {
          setuserdapps(cacheJson);
        }
      }
    } catch (e) {}

    const res = await getUserDapps();
    if (res && res.data) {
      setuserdapps(res.data as UserDapp[]);
      localStorage.setItem('userdapps', JSON.stringify(res.data));
    }
  };
  useEffect(() => {
    loadFavs();
  }, []);
  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      <Grid container spacing={2}>
        {userdapps.map((u) => {
          const dapp = u.dapp;
          return (
            <Grid item xs={2}>
              <ListItem
                disablePadding
                style={{
                  background: '#fff',
                  borderRadius: '5px',
                  border: '1px solid #efefef',
                }}
                onClick={() => {
                  window.location.href = `${process.env.NEXT_PUBLIC_APIBASE}/dapps/jump/${dapp.id}`;
                }}
              >
                <ListItemButton style={{ padding: '5px 10px' }}>
                  <ListItemIcon
                    style={{
                      minWidth: '20px',
                      width: '20px',
                      marginRight: '8px',
                    }}
                  >
                    <img
                      src={dapp.logo || ''}
                      style={{ height: '20px', borderRadius: '5px' }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          lineHeight: '20px',
                          height: '20px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {dapp.title}{' '}
                      </div>
                    }
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
