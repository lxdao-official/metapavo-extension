import { Box, Grid } from '@mui/material';
import { Input, Loading } from '@nextui-org/react';
import { dapps, tokens } from 'extension-common/src/apis';
import { searchDapps } from 'extension-common/src/apis/dapps_api';
import { IKOL, searchKols } from 'extension-common/src/apis/kol_api';
import { searchProjectsV2 } from 'extension-common/src/apis/nft_api_v2';
import { projectLinksWrapper } from 'extension-common/src/apis/project_wrapper';
import { searchTokens } from 'extension-common/src/apis/tokens_api';
import { IProjectV2 } from 'extension-common/src/apis/types';
import { getLang } from 'extension-common/src/lang';
import { useEffect, useRef, useState } from 'react';

import CoinNormalCard from '../cards/CoinNormalCard';
import DappCard from '../cards/DappCard';
import { KolDetailCard } from '../cards/KolDetailCard';
import NFTCard from '../cards/NFTCard';
import styles from '../styles/Home.module.css';

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
export default function Search() {
  const [keyword, setKeyword] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [dappsSearching, setDappsSearching] = useState(false);
  const [dapps, setDapps] = useState<dapps[]>([]);
  const [kols, setKols] = useState<IKOL[]>([]);
  const [kolSearching, setKolSearching] = useState(false);
  const debouncedValue = useDebounce(keyword, 500);

  async function _searchKols(keyword: string) {
    setKolSearching(true);
    try {
      const _kols = await searchKols(keyword);
      setKols(_kols.slice(0, 12));
    } catch (e) {}

    setKolSearching(false);
  }
  async function _searchDapps(keyword: string) {
    setDappsSearching(true);
    try {
      const _dapps = await searchDapps(keyword);
      setDapps(_dapps.slice(0, 12));
    } catch (e) {}

    setDappsSearching(false);
  }
  const [nftsSearching, setNFTsSearching] = useState(false);
  const [nfts, setNFTs] = useState<IProjectV2[]>([]);
  async function _searchNFTs(keyword: string) {
    setNFTsSearching(true);
    try {
      const res = await searchProjectsV2(keyword);
      const _nfts =
        res?.records
          ?.map((nft) => {
            return projectLinksWrapper(nft);
          })
          .sort((n1, n2) => {
            return (
              Number(n2.nftProjectInfo?.stats[0]?.totalVolume) -
              Number(n1.nftProjectInfo?.stats[0]?.totalVolume)
            );
          }) || [];
      setNFTs(_nfts.slice(0, 6));
    } catch (e) {}

    setNFTsSearching(false);
  }
  const [tokensSearching, settokensSearching] = useState(false);
  const [tokens, settokens] = useState<tokens[]>([]);
  async function _searchtokens(keyword: string) {
    settokensSearching(true);
    try {
      const res = await searchTokens(keyword);
      const _tokens = res || [];
      settokens(_tokens.slice(0, 6));
    } catch (e) {}

    settokensSearching(false);
  }
  useEffect(() => {
    if (debouncedValue != undefined) {
      _searchDapps(keyword);
      _searchNFTs(keyword);
      _searchtokens(keyword);
      _searchKols(keyword);
    }
  }, [debouncedValue]);

  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event: any) {
      //@ts-ignore
      // if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      //   setInputFocus(false);
      // }
      if (event.key == 'Escape') {
        setInputFocus(false);
      }
    }
    document.addEventListener('keydown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div className={styles.searchBg}>
      <Box
        style={{
          width: '700px',
          margin: '0 auto',
          position: 'relative',
        }}
        ref={wrapperRef}
        sx={{
          '& *::-webkit-scrollbar': {
            width: '1px',
            height: '1px',
          },
        }}
      >
        <Input
          placeholder={getLang('search_placeholder')}
          clearable
          width="100%"
          shadow={false}
          css={{
            height: '40px',
            background: '#fff',
            border: 'none',
            textAlign: 'center',
            fontSize: '14px',
            borderRadius: '20px',
            borderBottomLeftRadius: inputFocus ? '0px' : '20px',
            borderBottomRightRadius: inputFocus ? '0px' : '20px',
            '& label': {
              borderRadius: '20px',
              borderBottomLeftRadius: inputFocus ? '0px' : '20px',
              borderBottomRightRadius: inputFocus ? '0px' : '20px',
              margin: 0,
            },
            '& .nextui-input': {
              borderRadius: '20px',
              border: 'none',
              margin: 0,
              paddingLeft: '15px',
            },
            '& .nextui-input-clear-button': {
              right: '10px',
            },
          }}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          onFocus={() => {
            setInputFocus(true);
          }}
          onKeyDown={(e) => {
            // enter press
            if (e.code == 'Enter') {
              window.location.href = `https://www.google.com/search?q=${keyword}`;
            }
          }}
        />
        {inputFocus && (
          <Box
            style={{
              position: 'absolute',
              top: '40px',
              left: '0',
              width: '100%',
              overflowY: 'auto',
              background: '#fff',
              borderRadius: '20px',
              borderTopLeftRadius: '0px',
              borderTopRightRadius: '0px',
              padding: '20px',
              boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
              zIndex: 999,
            }}
          >
            <div
              style={{
                lineHeight: '30px',
                fontSize: '14px',
                color: '#444',
                fontWeight: 500,
              }}
            >
              DAPPs
            </div>
            {dappsSearching ? (
              <div style={{}}>
                <Loading size="xs" />
              </div>
            ) : dapps.length > 0 ? (
              <Grid container spacing={1}>
                {dapps.map((dapp) => {
                  return (
                    <Grid item xs={3}>
                      <DappCard dapp={dapp} showPick={true} key={dapp.id} />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <div
                style={{
                  textAlign: 'left',
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '40px',
                }}
              >
                {getLang('No_results')}
              </div>
            )}
            <div
              style={{
                lineHeight: '30px',
                fontSize: '14px',
                color: '#444',
                fontWeight: 500,
              }}
            >
              NFTs
            </div>
            {nftsSearching ? (
              <div style={{}}>
                <Loading size="xs" />
              </div>
            ) : nfts.length > 0 ? (
              <div
                style={{
                  overflowX: 'auto',
                  width: '100%',
                }}
              >
                <Grid
                  container
                  spacing={1}
                  style={{
                    width: '180%',
                  }}
                >
                  {nfts.map((nft) => {
                    return (
                      <Grid item xs={2}>
                        <NFTCard
                          activeProject={nft}
                          showPick={true}
                          key={nft.id}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'left',
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '40px',
                }}
              >
                {getLang('No_results')}
              </div>
            )}
            <div
              style={{
                lineHeight: '30px',
                fontSize: '14px',
                color: '#444',
                fontWeight: 500,
                marginTop: '10px',
              }}
            >
              Tokens
            </div>
            {tokensSearching ? (
              <div style={{}}>
                <Loading size="xs" />
              </div>
            ) : tokens.length > 0 ? (
              <div
                style={{
                  overflowX: 'auto',
                  width: '100%',
                }}
              >
                <Grid
                  container
                  spacing={1}
                  style={{
                    width: '180%',
                  }}
                >
                  {tokens.map((token) => {
                    return (
                      <Grid item xs={2}>
                        <CoinNormalCard
                          token={token}
                          showPick={true}
                          key={token.id}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'left',
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '40px',
                }}
              >
                {getLang('No_results')}
              </div>
            )}
            <div
              style={{
                lineHeight: '30px',
                fontSize: '14px',
                color: '#444',
                fontWeight: 500,
                marginTop: '10px',
              }}
            >
              KOLs
            </div>
            {kolSearching ? (
              <div style={{}}>
                <Loading size="xs" />
              </div>
            ) : kols.length > 0 ? (
              <div
                style={{
                  overflowX: 'auto',
                  width: '100%',
                  marginTop: '10px',
                }}
              >
                <Grid
                  container
                  spacing={1}
                  style={{
                    width: '180%',
                  }}
                >
                  {kols.map((kol) => {
                    return (
                      <Grid
                        item
                        xs={2}
                        sx={{
                          overflow: 'hidden',
                        }}
                      >
                        <KolDetailCard
                          kol={kol}
                          isCollected={false}
                          key={kol.username}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            ) : (
              <div
                style={{
                  textAlign: 'left',
                  fontSize: '12px',
                  color: '#666',
                  lineHeight: '40px',
                }}
              >
                {getLang('No_results')}
              </div>
            )}
          </Box>
        )}
      </Box>
    </div>
  );
}
