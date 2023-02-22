import { getUsersFavs } from 'extension-common/src/apis/nft_api';
import { getOpenSeaStats } from 'extension-common/src/apis/nft_api_v2';
import { projectLinksWrapper } from 'extension-common/src/apis/project_wrapper';
import { favs } from 'extension-common/src/apis/types';
import { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import NFTItem from './NFTItem';

const scroll = keyframes`
    0% {
        margin-left: 0
    }

    to {
        margin-left: -50%;
    }
`;
const BarContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 30px;
  right: 0;
  bottom: 0;
  z-index: 100000000000;
  background-color: #666;
  transition: all 0.3s ease;
`;

const BarInner = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
`;
const BarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: all 0.3s ease;
  border-right: 1px solid #666;
  flex-shrink: 0;
  padding: 0 10px;
`;
const BarLabel = styled.div`
  font-family: 'Inter', Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC',
    'Microsoft YaHei', sans-serif !important;
  font-size: 12px !important;
  color: #fff !important;
`;
const BarValue = styled.div`
  font-family: 'Inter', Roboto, -apple-system, BlinkMacSystemFont, 'PingFang SC',
    'Microsoft YaHei', sans-serif !important;
  font-size: 12px !important;
  color: #fff !important;
  padding: 0 10px;
`;
const BarNFTContainer = styled.div`
  height: 100%;
  flex: 1;
  overflow: hidden;
  background-color: #000;
`;
const BarNFTInner = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  animation: ${scroll} 40s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
`;
export default function Bar() {
  const [gas, setGas] = useState(0);

  const [favs, setFavs] = useState<favs[]>([]);
  const [isRecommend, setIsRecommend] = useState(false);
  const loadFavs = async () => {
    const isTwoLine = !!localStorage.getItem('myfavs_two_line');
    try {
      const cache = localStorage.getItem('myfavs');

      if (cache) {
        const cacheJson = JSON.parse(cache);
        setFavs(cacheJson);
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
      setFavs(data);

      localStorage.setItem('myfavs', JSON.stringify(data));

      const new_data = JSON.parse(JSON.stringify(data));
      for (let i = 0; i < new_data.length; i++) {
        const d = new_data[i];
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
      setFavs(new_data);
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

      setFavs(data);
    } else {
      setIsRecommend(false);
    }
  };
  async function getTokenPrice(symbol: string): Promise<number> {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        cmd: 'tokenPrice',
        symbol,
      });
    });
  }

  const [ethPrice, setEthPrice] = useState('0');
  const [btcPrice, setBtcPrice] = useState('0');
  async function loadPrice() {
    getTokenPrice('ETHUSDT');
    getTokenPrice('BTCUSDT');

    chrome.runtime?.onMessage.addListener((request: any) => {
      if (request.type === 'token_price_update') {
        if (request.data.symbol === 'ETHUSDT')
          setEthPrice(Number(request.data.price).toFixed(2));
        if (request.data.symbol === 'BTCUSDT')
          setBtcPrice(Number(request.data.price).toFixed(2));
      }
    });
    setEthPrice(ethPrice);
    setBtcPrice(btcPrice);
  }
  const [isHide, setIsHide] = useState(false);
  useEffect(() => {
    console.log('bar init');
    loadFavs();
    loadPrice();
    chrome.runtime?.sendMessage(
      {
        cmd: 'getGas',
      },
      function (request) {
        if (!chrome.runtime.lastError) {
          if (request.type !== 'GAS') {
          } else {
            setGas(request.value);
          }
        } else {
        }
      },
    );

    // document.body.addEventListener('scroll', function () {
    //   // 滚动到距离底部 100px
    //   if (
    //     document.body.scrollHeight -
    //       document.documentElement.scrollTop -
    //       document.body.clientHeight <
    //     100
    //   ) {
    //     setIsHide(true);
    //   } else {
    //     setIsHide(false);
    //   }
    // });
  }, []);
  return (
    <BarContainer
      style={{
        bottom: isHide ? '-100px' : '0px',
      }}
    >
      <BarInner>
        <BarItem>
          <BarLabel>GAS: {gas}</BarLabel>
        </BarItem>
        {ethPrice ? (
          <BarItem>
            <BarLabel>ETH Price: {ethPrice}</BarLabel>
          </BarItem>
        ) : null}
        {btcPrice ? (
          <BarItem>
            <BarLabel>BTC Price: {btcPrice}</BarLabel>
          </BarItem>
        ) : null}
        <BarNFTContainer>
          <BarNFTInner>
            <>
              {favs.map((fav) => {
                return (
                  <BarItem key={fav.id}>
                    <NFTItem activeProject={fav.project!} />
                  </BarItem>
                );
              })}
            </>
            <>
              {favs.map((fav) => {
                return (
                  <BarItem key={fav.id}>
                    <NFTItem activeProject={fav.project!} />
                  </BarItem>
                );
              })}
            </>
          </BarNFTInner>
        </BarNFTContainer>
      </BarInner>
    </BarContainer>
  );
}
