import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { LinkLater, getList } from '../../stores/read-later';

export default function ReadLaters() {
  const [websiteURL, setWebsiteURL] = useState<string>('');
  const [groupedLaters, setGroupedLaters] = useState<LinkLater[][]>([]);
  const pageEle = useRef(null);
  const loadList = async () => {
    try {
      const result = await getList();
      if (result.length) {
        const _group = [];
        for (let i = 0; i < result.length; i += 12) {
          _group.push(result.slice(i, i + 12));
        }
        setGroupedLaters(_group);
      }
    } catch (e) {}
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
        {groupedLaters.map((group) => {
          return (
            <SwiperSlide>
              <Grid container spacing={1}>
                {group.map((u) => {
                  return (
                    <Grid item xs={3}>
                      <ListItem
                        disablePadding
                        style={{
                          background: '#fff',
                          borderRadius: '5px',
                          border: '1px solid #efefef',
                        }}
                        onClick={() => {
                          window.location.href = `${u.link}`;
                        }}
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
                              src={u.icon || websiteURL}
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
