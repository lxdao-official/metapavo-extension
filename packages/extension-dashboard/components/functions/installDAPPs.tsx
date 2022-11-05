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
    const res = await getUserDapps();
    if (res) {
      setuserdapps(res as UserDapp[]);
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
            <Grid item xs={3}>
              <ListItem
                disablePadding
                style={{
                  background: '#fff',
                  borderRadius: '10px',
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <img src={dapp.logo || ''} style={{ height: '40px' }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <>
                        {dapp.title}{' '}
                        <div>
                          <span
                            style={{
                              paddingRight: '10px',
                              color: '#999',
                              fontSize: '12px',
                              fontWeight: '300',
                            }}
                          >
                            install: {dapp.install_count}
                          </span>
                          <span
                            style={{
                              color: '#999',
                              fontSize: '12px',
                              fontWeight: '300',
                            }}
                          >
                            visit: {dapp.visit_count}
                          </span>
                        </div>
                      </>
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
