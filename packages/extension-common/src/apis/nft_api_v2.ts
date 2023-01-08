import config from '../../config';
import { fetchWrapped } from './fetch';
import { IProject, IProjectV2, PagedDto } from './types';

export async function getNftByTwitterIdV2(
  twitterId: string,
): Promise<IProjectV2 | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_twitter/v2/${twitterId}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getNftByIdV2(id: string): Promise<IProjectV2 | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_id/v2/${id}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function findNftByAddressV2(
  address: string,
): Promise<IProjectV2 | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_address/v2/${address}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function findNftByURLV2(url: string): Promise<IProjectV2 | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_url/v2/${encodeURIComponent('https://' + url)}`,
    {},
    false,
  );
  if (res && res.success && res.data && res.data.id) {
    return res.data;
  }
  return null;
}

export async function searchProjectsV2(
  keyword: string,
): Promise<PagedDto<IProjectV2> | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/search/v2/${keyword}?pageSize=${100}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function myProjects(
  pageIndex: number,
  pageSize: number,
): Promise<PagedDto<IProjectV2> | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/my_nfts?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {},
  );
  if (res && res.success) {
    return res;
  }
  return null;
}

export interface IOpenSeaStats {
  one_hour_volume: number;
  one_hour_change: number;
  one_hour_sales: number;
  one_hour_sales_change: number;
  one_hour_average_price: number;
  one_hour_difference: number;
  six_hour_volume: number;
  six_hour_change: number;
  six_hour_sales: number;
  six_hour_sales_change: number;
  six_hour_average_price: number;
  six_hour_difference: number;
  one_day_volume: number;
  one_day_change: number;
  one_day_sales: number;
  one_day_sales_change: number;
  one_day_average_price: number;
  one_day_difference: number;
  seven_day_volume: number;
  seven_day_change: number;
  seven_day_sales: number;
  seven_day_average_price: number;
  seven_day_difference: number;
  thirty_day_volume: number;
  thirty_day_change: number;
  thirty_day_sales: number;
  thirty_day_average_price: number;
  thirty_day_difference: number;
  total_volume: number;
  total_sales: number;
  total_supply: number;
  count: number;
  num_owners: number;
  average_price: number;
  num_reports: number;
  market_cap: number;
  floor_price: number;
}
export async function getOpenSeaStats(
  symbol: string,
): Promise<IOpenSeaStats | null> {
  const res = await fetchWrapped(
    `https://api.opensea.io/api/v1/collection/${symbol}/stats`,
    {},
  );
  if (res && res.stats) {
    return res.stats;
  }
  return null;
}
