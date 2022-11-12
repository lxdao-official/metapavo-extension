import { Box, Grid } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UserContext } from '../../context/useUser';
import { getUsersFavs } from '../../utils/apis/nft_api';
import { projectLinksWrapper } from '../../utils/apis/project_wrapper';
import { favs } from '../../utils/apis/types';
import { getLang } from '../../utils/lang';
import NFTCard from '../cards/NFTCard';

export default function CollectedNFTs() {
  const { token } = useContext(UserContext);
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
      const data = res.data
        .map((fav) => {
          if (fav.project) {
            fav.project = projectLinksWrapper(fav.project);
          }
          return fav;
        })
        .sort((n1, n2) => {
          return Number(n2.project?.nftProjectInfo?.stats[0]?.floorPrice) -
            Number(n1.project?.nftProjectInfo?.stats[0]?.floorPrice) >
            0
            ? 1
            : -1;
        });

      const _group = [];
      for (let i = 0; i < data.length; i += 4) {
        _group.push(data.slice(i, i + 4));
      }
      setGroupedFavs(_group);
      localStorage.setItem('myfavs', JSON.stringify(data));
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
      {token ? (
        groupedFavs.length == 0 ? (
          <div
            style={{
              textAlign: 'left',
              width: '100%',
              fontSize: '14px',
              lineHeight: '50px',
              paddingLeft: '10px',
            }}
          >
            {getLang('no_nfts')}
          </div>
        ) : (
          <>
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
          </>
        )
      ) : (
        <div
          style={{
            textAlign: 'left',
            width: '100%',
            fontSize: '14px',
            lineHeight: '50px',
            paddingLeft: '10px',
            color: '#666',
          }}
        >
          {getLang('not_login_for_module')}
        </div>
      )}
    </Box>
  );
}
