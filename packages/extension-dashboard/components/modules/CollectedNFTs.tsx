import { Box, Grid } from '@mui/material';
import globalEvent from 'extension-common/src/EventBus';
import { getUsersFavs } from 'extension-common/src/apis/nft_api';
import { getOpenSeaStats } from 'extension-common/src/apis/nft_api_v2';
import { projectLinksWrapper } from 'extension-common/src/apis/project_wrapper';
import { favs } from 'extension-common/src/apis/types';
import { getLang } from 'extension-common/src/lang';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UserContext } from '../../context/useUser';
import NFTCard from '../cards/NFTCard';
import NoLogin from './common/NoLogin';

export default function CollectedNFTs() {
  const { token } = useContext(UserContext);
  const [groupedFavs, setGroupedFavs] = useState<favs[][]>([]);
  const pageEle = useRef(null);
  const [isRecommend, setIsRecommend] = useState(false);
  const loadFavs = async () => {
    const isTwoLine = !!localStorage.getItem('myfavs_two_line');
    try {
      const cache = localStorage.getItem('myfavs');

      if (cache) {
        const cacheJson = JSON.parse(cache);
        const _group = [];
        if (cacheJson.length) {
          for (let i = 0; i < cacheJson.length; i += isTwoLine ? 8 : 4) {
            _group.push(cacheJson.slice(i, i + (isTwoLine ? 8 : 4)));
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
      for (let i = 0; i < data.length; i += isTwoLine ? 8 : 4) {
        _group.push(data.slice(i, i + (isTwoLine ? 8 : 4)));
      }
      setGroupedFavs(_group);

      localStorage.setItem('myfavs', JSON.stringify(data));

      const new_group = JSON.parse(JSON.stringify(_group));
      for (let i = 0; i < new_group.length; i++) {
        for (let j = 0; j < new_group[i].length; j++) {
          const d = new_group[i][j];
          if (d.project?.nftProjectInfo && d.project?.nftProjectInfo?.slug) {
            try {
              const stats = await getOpenSeaStats(
                d.project?.nftProjectInfo?.slug!,
              );
              if (stats && d.project?.nftProjectInfo?.stats[0]) {
                d.project!.nftProjectInfo!.stats[0].floorPrice = String(
                  stats.floor_price,
                );
                d.project!.nftProjectInfo!.stats[0].oneDaySales =
                  stats.one_day_sales;
                d.project!.nftProjectInfo!.stats[0].oneDayChange =
                  stats.one_day_change;
                d.project!.nftProjectInfo!.stats[0].oneDayVolume = String(
                  stats.one_day_volume,
                );
                d.project!.nftProjectInfo!.stats[0].oneDayDifference =
                  stats.one_day_difference;
              }
            } catch (e) {}
          }
        }
        console.log('setGroupedFavs', new_group);
        setGroupedFavs(new_group);
      }
      console.log('setGroupedFavs', new_group);
      setGroupedFavs(new_group);
    }
    //@ts-ignore
    if (res && res.recommends && res.recommends.length) {
      setIsRecommend(true);
      //@ts-ignore
      const data = res.recommends.map((fav: favs) => {
        if (fav.project) {
          fav.project = projectLinksWrapper(fav.project);
        }
        return fav;
      });
      const _group = [];
      for (let i = 0; i < data.length; i += isTwoLine ? 8 : 4) {
        _group.push(data.slice(i, i + (isTwoLine ? 8 : 4)));
      }
      setGroupedFavs(_group);
    } else {
      setIsRecommend(false);
    }
  };
  useEffect(() => {
    globalEvent.on('reloadFavs', () => {
      loadFavs();
    });
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
            {isRecommend ? (
              <div
                style={{
                  lineHeight: '20px',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  background: '#f7f7f7',
                  color: '#444',
                  fontSize: '12px',
                  marginBottom: '15px',
                  marginTop: '5px',
                  display: 'inline-block',
                }}
              >
                {getLang('recommend_nfts')}
              </div>
            ) : null}
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
                              <NFTCard
                                activeProject={fav.project}
                                showUnpick={isRecommend ? false : true}
                                onUnpick={() => {
                                  loadFavs();
                                }}
                              ></NFTCard>
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
