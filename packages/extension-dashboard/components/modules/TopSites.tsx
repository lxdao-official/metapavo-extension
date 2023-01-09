import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Tooltip } from '@nextui-org/react';
import { getLogo } from 'extension-common/src/getLogo';
import { useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function TopSites() {
  const websiteURL = chrome.runtime.getURL('images/website.png');
  const [sites, setSites] = useState<
    {
      url: string;
      title: string;
      icon?: string;
    }[]
  >([]);

  const loadList = async () => {
    try {
      try {
        chrome.topSites.get(async (list) => {
          setSites(list);
          fetchLogos(list);
        });
      } catch (e) {
        console.error(e);
      }
    } catch (e) {}
  };
  const fetchLogos = async (
    sites: {
      url: string;
      title: string;
      icon?: string;
    }[],
  ) => {
    const _sites = [...sites];
    for (let i = 0; i < _sites.length; i++) {
      const item = _sites[i];
      if (item.url) {
        const favicon = await getLogo(item.url);
        if (favicon) {
          _sites[i].icon = favicon;
        }
      }
      setSites(_sites);
    }
  };
  useEffect(() => {
    loadList();
  }, []);
  return (
    <Box
      mt={2}
      style={{
        width: '100%',
      }}
    >
      <Grid container spacing={1} style={{ width: '100%' }} columns={10}>
        {sites.map((u) => {
          return (
            <Grid item xs={2} style={{ overflow: 'hidden' }}>
              <Tooltip
                content={u.url}
                style={{
                  width: '100%',
                }}
              >
                <a
                  href={u.url}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                  }}
                  target="_blank"
                >
                  <img
                    src={u.icon || websiteURL}
                    style={{
                      height: '18px',
                      width: '18px',
                      borderRadius: '50%',
                    }}
                  />
                  <div
                    style={{
                      fontSize: '12px',
                      lineHeight: '30px',
                      marginLeft: '5px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: 1,
                      height: '30px',
                    }}
                  >
                    {u.title}
                  </div>
                </a>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
