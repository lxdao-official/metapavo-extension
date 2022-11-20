import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { getLogo } from 'extension-common/src/getLogo';
import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function VisitHistories() {
  const [websiteURL, setWebsiteURL] = useState<string>('');
  const [groupedHistories, setGroupedHistories] = useState<
    (chrome.history.HistoryItem & { logo?: string })[][]
  >([]);
  const pageEle = useRef(null);

  const loadList = async () => {
    try {
      chrome.history.search(
        {
          maxResults: 300,
          text: '',
        },
        (results: chrome.history.HistoryItem[]) => {
          if (results.length) {
            let realResults = [];
            const processedHost: any = {};
            for (let i = 0; i < results.length; i++) {
              if (results[i].url?.match(/http(s):\/\//)) {
                const host = results[i].url?.replace(
                  /^(http(s)?:\/\/(.*?))\/.*$/,
                  '$1',
                );
                if (host) {
                  if (!processedHost[host]) {
                    realResults.push(results[i]);
                    processedHost[host] = true;
                  }
                }
              }
            }
            realResults = realResults.slice(0, 36);
            const _group = [];
            for (let i = 0; i < realResults.length; i += 12) {
              _group.push(realResults.slice(i, i + 12));
            }
            setGroupedHistories(_group);
            fetchLogos(_group);
          }
        },
      );
    } catch (e) {}
  };

  const fetchLogos = async (groupedHistories: any) => {
    const _groupedHistories = [...groupedHistories];
    for (let i = 0; i < groupedHistories.length; i++) {
      for (let j = 0; j < groupedHistories[i].length; j++) {
        const item = groupedHistories[i][j];
        if (item.url) {
          const favicon = await getLogo(item.url);
          if (favicon) {
            groupedHistories[i][j].logo = favicon;
          }
        }
        setGroupedHistories(_groupedHistories);
      }
    }
  };
  useEffect(() => {
    loadList();
    setWebsiteURL(chrome.runtime.getURL('images/website.png'));
  }, []);
  return (
    <Box
      mt={2}
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
        {groupedHistories.map((group) => {
          return (
            <SwiperSlide>
              <Grid container spacing={1} style={{ width: '100%' }}>
                {group.map((u) => {
                  return (
                    <Grid item xs={3}>
                      <ListItem
                        disablePadding
                        style={{
                          background: '#fff',
                          borderRadius: '5px',
                          border: '1px solid #efefef',
                          marginBottom: '0',
                        }}
                        onClick={() => {
                          window.location.href = `${u.url}`;
                        }}
                        title={u.title}
                      >
                        <ListItemButton style={{ padding: '3px 8px' }}>
                          <ListItemIcon
                            style={{
                              minWidth: '16px',
                              width: '16px',
                              marginRight: '8px',
                            }}
                          >
                            <img
                              src={u.logo || websiteURL}
                              style={{ height: '16px', borderRadius: '5px' }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <div
                                style={{
                                  fontSize: '12px',
                                  fontWeight: 300,
                                  lineHeight: '20px',
                                  height: '20px',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {u.title}
                              </div>
                            }
                          ></ListItemText>
                        </ListItemButton>
                      </ListItem>
                    </Grid>
                  );
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
