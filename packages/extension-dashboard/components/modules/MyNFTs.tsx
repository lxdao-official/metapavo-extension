import { Box, Grid } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UserContext } from '../../context/useUser';
import { getUsersFavs } from '../../utils/apis/nft_api';
import { myProjects } from '../../utils/apis/nft_api_v2';
import { projectLinksWrapper } from '../../utils/apis/project_wrapper';
import { IProjectV2, favs } from '../../utils/apis/types';
import { getLang } from '../../utils/lang';
import NFTCard from '../cards/NFTCard';
import NoLogin from './common/NoLogin';

export default function MyNFTs() {
  const { token } = useContext(UserContext);
  const [groupedFavs, setGroupedFavs] = useState<IProjectV2[][]>([]);
  const pageEle = useRef(null);
  const loadFavs = async () => {
    try {
      const cache = localStorage.getItem('mynfts');
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
    const res = await myProjects(1, 100);
    if (res && res.data) {
      const data = res.data
        .map((project) => {
          return projectLinksWrapper(project);
        })
        .sort((n1, n2) => {
          return Number(n2.nftProjectInfo?.stats[0]?.floorPrice) -
            Number(n1.nftProjectInfo?.stats[0]?.floorPrice) >
            0
            ? 1
            : -1;
        });
      const _group = [];
      for (let i = 0; i < data.length; i += 4) {
        _group.push(data.slice(i, i + 4));
      }
      setGroupedFavs(_group);
      localStorage.setItem('mynfts', JSON.stringify(data));
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
                      {group.map((project) => {
                        if (project) {
                          return (
                            <Grid item xs={6}>
                              <NFTCard activeProject={project}></NFTCard>
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
        <NoLogin />
      )}
    </Box>
  );
}
