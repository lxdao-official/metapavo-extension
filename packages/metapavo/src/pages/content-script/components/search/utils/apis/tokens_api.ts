import { tokens } from '.';
import config from '../../../../../../config';
import { fetchWrapped } from './fetch';

export async function searchTokens(keyword: string): Promise<tokens[]> {
  const res = await fetchWrapped(
    `${config.baseURL}/tokens/search/${keyword}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return [];
}
