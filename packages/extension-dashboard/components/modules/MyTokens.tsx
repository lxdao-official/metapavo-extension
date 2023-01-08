import { Box, Grid } from '@mui/material';
import { utils } from 'ethers';
import { tokens } from 'extension-common/src/apis';
import { getTokenList } from 'extension-common/src/apis/chainbase_api';
import { getUsersFavs } from 'extension-common/src/apis/nft_api';
import { myProjects } from 'extension-common/src/apis/nft_api_v2';
import { projectLinksWrapper } from 'extension-common/src/apis/project_wrapper';
import { queryBySlugs } from 'extension-common/src/apis/tokens_api';
import { IProjectV2, favs } from 'extension-common/src/apis/types';
import { getLang } from 'extension-common/src/lang';
import {
  getListConfig,
  setListConfig,
} from 'extension-common/src/localStore/store';
import { useContext, useEffect, useRef, useState } from 'react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';

import { UserContext } from '../../context/useUser';
import CoinBalanceCard from '../cards/CoinBalanceCard';
import CoinNormalCard from '../cards/CoinNormalCard';
import NFTCard from '../cards/NFTCard';
import NoLogin from './common/NoLogin';

type tokens_with_balance = tokens & {
  balance?: string;
  value?: number;
  decimals?: number;
};
export default function MyTokens() {
  const { token } = useContext(UserContext);
  const { loginedAddress } = useContext(UserContext);
  const [tokens, setTokens] = useState<tokens_with_balance[]>([]);
  const [mytokens, setMyTokens] = useState<
    {
      contract_address: string;
      name: string;
      symbol: string;
      decimals: string;
      balance: string;
    }[]
  >([]);
  const loadTokens = async () => {
    const _local = getListConfig('my_tokens', [] as tokens_with_balance[]);

    if (_local && _local.length) {
      setTokens(_local);
    }
    const res = await getTokenList(loginedAddress);

    setMyTokens(res);
    const myTokenSymbols = res
      .map((t) => t.symbol)
      .filter((s) => {
        return s != '' && s.indexOf(' ') == -1;
      });
    let tokens = (await queryBySlugs(myTokenSymbols)) as tokens_with_balance[];

    tokens = tokens
      .map((t) => {
        const myToken = res.find((r) => r.symbol == t.symbol);
        if (myToken) {
          t.balance = myToken.balance;
          t.value =
            parseFloat(
              utils.formatUnits(myToken.balance, myToken.decimals || 18),
            ) * (t.price || 0);
          t.decimals = parseInt(myToken.decimals);
        }
        return t;
      })
      .sort((a, b) => {
        return a.value! - b.value! > 0 ? -1 : 1;
      });
    setTokens(tokens || []);

    setListConfig('my_tokens', tokens);
  };
  useEffect(() => {
    if (loginedAddress) {
      loadTokens();
    }
  }, [loginedAddress]);
  return (
    <Box
      mt={1}
      style={{
        width: '100%',
      }}
    >
      {token ? (
        tokens.length == 0 ? (
          <div
            style={{
              textAlign: 'left',
              width: '100%',
              fontSize: '14px',
              lineHeight: '50px',
              paddingLeft: '10px',
            }}
          >
            {getLang('no_tokens')}
          </div>
        ) : (
          <>
            <Grid container spacing={2}>
              {tokens.map((token) => {
                return (
                  <Grid item xs={4}>
                    <CoinBalanceCard token={token} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )
      ) : (
        <NoLogin />
      )}
    </Box>
  );
}
