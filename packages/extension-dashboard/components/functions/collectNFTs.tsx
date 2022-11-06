import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import { getUsersFavs } from '../../utils/apis/nft_api';
import { projectLinksWrapper } from '../../utils/apis/project_wrapper';
import { favs } from '../../utils/apis/types';
import NFTCard from '../cards/NFTCard';

export default function FavNFTModule() {
  const [favs, setFavs] = useState<favs[]>([]);
  const loadFavs = async () => {
    try {
      const cache = localStorage.getItem('myfavs');
      if (cache) {
        const cacheJson = JSON.parse(cache);
        if (cacheJson.length) {
          setFavs(cacheJson);
        }
      }
    } catch (e) {}
    const res = await getUsersFavs();
    if (res && res.data) {
      res.data.map((fav) => {
        if (fav.project) {
          fav.project = projectLinksWrapper(fav.project);
        }
      });
      setFavs(res.data);
      localStorage.setItem('myfavs', JSON.stringify(res.data));
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
        {favs.map((fav) => {
          if (fav.project) {
            return (
              <Grid item xs={3}>
                <NFTCard activeProject={fav.project}></NFTCard>
              </Grid>
            );
          }
          return <></>;
        })}
      </Grid>
    </Box>
  );
}
