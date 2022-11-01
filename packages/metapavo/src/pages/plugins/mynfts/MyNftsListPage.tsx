import { Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { getNftById, getUsersFavs } from '../../../utils/apis/nft_api';
import { getNftByIdV2, myProjects } from '../../../utils/apis/nft_api_v2';
import { projectLinksWrapper } from '../../../utils/apis/project_wrapper';
import { IFavs, favs } from '../../../utils/apis/types';
import { getLang } from '../../../utils/lang';
import { linkImages } from '../../../utils/linkImages';
import { ItemSkeleton } from '../../content-script/components/common/ItemSkeleton';
import { Empty } from '../../content-script/components/side-panel/index/comps/Empty';
import { GlobalContext } from '../../content-script/context/useGlobal';
import { HeadReturn } from '../common/HeadReturn';
import { ItemContainer, MoreButton, PageContainer } from '../styleCom';

const ListItem = (props: any) => {
  const { userIcon, useName, userEth, links, dayTime, hourTime } =
    props.itemData;

  return (
    <ItemContainer onClick={props.onClick}>
      <img className="user-icon" src={userIcon} alt="" />
      <div className="user-des">
        <span className="user-name">{useName}</span>
        <span className="user-eth">{userEth}</span>
      </div>
      <div className="imgs-container">
        {links.map((link: any, index: number) => {
          return (
            <a
              className="link-container"
              key={index}
              href={link.link}
              target="_blank"
            >
              <img className="link-icon" src={link.img} alt="" />
            </a>
          );
        })}
      </div>
    </ItemContainer>
  );
};

const MyNftsListPage = (props: any) => {
  const [list, setList] = useState<any[]>([]);
  const [watchLoading, setLoading] = useState(false);
  const { setActiveProject } = useContext(GlobalContext);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const getWatchList = async () => {
    getMoreWatchList(1);
  };
  const getMoreWatchList = async (_page: number) => {
    setLoading(true);
    try {
      const res = await myProjects(_page, 20);
      if (res?.data) {
        const newList: any[] = res.data.map((project) => {
          if (project) {
            project = projectLinksWrapper(project);
          }
          return {
            userIcon: project?.imageUrl,
            useName: project?.name,
            userEth: `Floor: ${
              project?.nftProjectInfo?.stats[0]?.floorPrice
                ? Number(project.nftProjectInfo.stats[0].floorPrice).toFixed(4)
                : '-'
            } E`,
            links: [
              {
                link: project?.externalUrl,
                img: linkImages.website,
              },
              {
                link: project?.links?.opensea,
                img: linkImages.opensea,
              },
              {
                link: project?.links?.gem,
                img: linkImages.gem,
              },
              {
                link: project?.links?.twitter,
                img: linkImages.twitter,
              },
            ].filter((item) => item.link),
            dayTime: moment(project.createTime).format('MM-DD'),
            hourTime: moment(project.createTime).format('mm:ss'),
            project_id: project.id,
            symbol: project?.symbol,
          };
        });
        setList([...list, ...newList]);
      }
    } catch (e) {
      toast.error('loading error');
    }

    setLoading(false);
  };
  const goDetail = async (symbol: string) => {
    const project = await getNftByIdV2(symbol);
    if (project) {
      setActiveProject(project);
    }
  };
  const nextPage = async () => {
    // setPage(page + 1);
    getMoreWatchList(page + 1);
    setPage(page + 1);
  };

  useEffect(() => {
    setPage(1);
    getWatchList();
  }, []);
  return (
    <PageContainer>
      <HeadReturn title={getLang('My_NFTs')} />
      <div className="trend-list">
        {list.map((item: any, index: number) => {
          return (
            <ListItem
              key={index}
              itemData={item}
              onClick={() => {
                goDetail(item.symbol);
              }}
            />
          );
        })}
      </div>
      {watchLoading ? (
        <Box>
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
          <ItemSkeleton />
        </Box>
      ) : list.length === 0 ? (
        <Empty />
      ) : null}
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '30px' }}>
        <MoreButton onClick={nextPage}>more</MoreButton>
      </Box>
    </PageContainer>
  );
};

export default MyNftsListPage;
