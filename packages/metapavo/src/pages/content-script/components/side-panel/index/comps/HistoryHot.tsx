import { Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getVisitHistories } from '../../../../../../utils/apis/nft_api';
import { projectLinksWrapper } from '../../../../../../utils/apis/project_wrapper';
import { visit_histories } from '../../../../../../utils/apis/types';
import { getLang } from '../../../../../../utils/lang';
import { linkImages } from '../../../../../../utils/linkImages';
import { Item } from '../../../../../plugins/history/HistoryListPage';
import { ItemSkeleton } from '../../../common/ItemSkeleton';
import { HistoryHotContainer, HotTitle } from '../styles';
import { Empty } from './Empty';

export const HistoryHotTitle = (props: any) => {
  const title = props.title;
  const navigate = useNavigate();
  return (
    <HotTitle>
      <span className="title">{title}</span>
      <span
        className="op"
        onClick={() => {
          navigate('/history');
        }}
      >
        {getLang('More')}
      </span>
    </HotTitle>
  );
};
export const HistoryHot = (props: any) => {
  const title = props.title;
  const [getHistoryLoading, setGetHistoryLoading] = useState(false);
  const [historyHot, setHistoryHot] = useState<any[]>([]);
  async function getHistories() {
    setGetHistoryLoading(true);
    const res = await getVisitHistories(1, 10);
    if (res?.data) {
      setHistoryHot(
        res.data.map((item: visit_histories) => {
          if (item.project) {
            item.project = projectLinksWrapper(item.project);
          }
          return {
            userIcon: item.project?.imageUrl,
            useName: item.project?.name,
            userEth: `Floor: ${
              item.project?.nftProjectInfo?.stats[0]?.floorPrice
                ? Number(
                    item.project.nftProjectInfo.stats[0].floorPrice,
                  ).toFixed(4)
                : '-'
            } E`,
            links: [
              {
                link: item.project?.externalUrl,
                img: linkImages.website,
              },
              {
                link: item.project?.links?.opensea,
                img: linkImages.opensea,
              },
              {
                link: item.project?.links?.gem,
                img: linkImages.gem,
              },
              {
                link: item.project?.links?.twitter,
                img: linkImages.twitter,
              },
            ].filter((item) => item.link),
            dayTime: moment(item.updated_at).format('MM-DD'),
            hourTime: moment(item.updated_at).format('mm:ss'),
            project_id: item.project_id,
            symbol: item.project?.symbol,
          };
        }),
      );
    }
    setGetHistoryLoading(false);
  }
  useEffect(() => {
    console.log('init');
    getHistories();
    // getFavs();
  }, []);
  return (
    <HistoryHotContainer>
      <HistoryHotTitle title={title} />

      <div className="hot-history-list">
        {getHistoryLoading ? (
          <Box>
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
            <ItemSkeleton />
          </Box>
        ) : historyHot.length === 0 ? (
          <Empty />
        ) : null}

        {historyHot.map((item: any, index: number) => {
          return (
            <Item
              key={index}
              itemData={item}
              onClick={() => {
                props.goDetail(item.symbol);
              }}
            />
          );
        })}
      </div>
    </HistoryHotContainer>
  );
};
