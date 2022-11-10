import { Box, Grid } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getUsersFavs } from '../../utils/apis/nft_api';
import { projectLinksWrapper } from '../../utils/apis/project_wrapper';
import { favs } from '../../utils/apis/types';
import NFTCard from '../cards/NFTCard';

export default function CollectedNFTs() {
  const [groupedFavs, setGroupedFavs] = useState<favs[][]>([]);
  const pageEle = useRef(null);
  const loadFavs = async () => {
    try {
      const cache = localStorage.getItem('myfavs');
      if (cache) {
        const cacheJson = JSON.parse(cache);
        const _group = [];
        if (cacheJson.length) {
          for (let i = 0; i < cacheJson.length; i += 4) {
            _group.push(cacheJson.slice(i, i + 4));
          }
          setGroupedFavs(_group);
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
      const _group = [];
      for (let i = 0; i < res.data.length; i += 4) {
        _group.push(res.data.slice(i, i + 4));
      }
      setGroupedFavs(_group);
      localStorage.setItem('myfavs', JSON.stringify(res.data));
    }
  };
  useEffect(() => {
    loadFavs();
  }, []);
  return (
    <Box
      mt={1}
      style={{
        width: '100%',
      }}
    >
      <Swiper
        slidesPerView={1}
        style={{ width: '100%' }} // install Swiper modules
        modules={[Pagination]}
        pagination={{ clickable: true, el: pageEle.current }}
      >
        {groupedFavs.map((group) => {
          return (
            <SwiperSlide>
              <Grid container spacing={2}>
                {group.map((fav) => {
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
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          height: '25px',
        }}
      >
        <div
          ref={pageEle}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      </div>
    </Box>
  );
}
