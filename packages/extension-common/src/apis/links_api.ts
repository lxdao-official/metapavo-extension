import config from '../../config';
import { fetchWrapped } from './fetch';
import { links, linktags, userlinks } from './index.d';

export async function searchLinks(keyword: string): Promise<links[]> {
  const res = await fetchWrapped(
    `${config.baseURL}/links/search?title=${keyword}&url=${keyword}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return [];
}

export async function fetchUsersTags(): Promise<linktags[]> {
  const res = await fetchWrapped(`${config.baseURL}/links/tags`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res && res.success) {
    return res.data;
  }
  return [];
}

export async function createUserTag(title: string, desc?: string) {
  return fetchWrapped(`${config.baseURL}/links/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      desc,
    }),
  });
}

export async function getUserLinks(
  pageIndex: number = 1,
  pageSize: number = 20,
): Promise<userlinks[] | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/links/installed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}
