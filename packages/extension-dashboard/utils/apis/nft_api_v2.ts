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
    `${config.baseURL}/nfts/by_url/v2/${encodeURIComponent(url)}`,
    {},
    false,
  );
  if (res && res.success) {
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
