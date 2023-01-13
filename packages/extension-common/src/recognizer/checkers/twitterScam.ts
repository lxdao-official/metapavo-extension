import config from '../../../config';
import { checkTwitterUser } from '../twitter';

async function checkIsScamServer(
  name: string,
  username: string,
): Promise<{
  result: boolean;
  scamDataList?: {
    name: string;
    url: string;
    username: string;
    status: number;
    createTime: string;
    updateTime: string;
    levenshtein: number;
  }[];
}> {
  if (!name)
    return {
      result: false,
    };
  const res = await fetch(
    `${config.baseURL}/users/twitter/scam/check/v2?name=${name}&username=${username}`,
  );
  const json = await res.json();
  return json.data;
}
let lastCheckTwitterId: string | null = null;
export async function checkTwitterScam(): Promise<
  | {
      result: boolean;
      slug: string;
      name: string;
      twitterUsername: string;
      scamDataList?: {
        name: string;
        url: string;
        username: string;
        status: number;
        createTime: string;
        updateTime: string;
        levenshtein: number;
      }[];
    }
  | undefined
> {
  if (window.location.host.indexOf('twitter.com') === -1) return undefined;

  const twitterPageDetail = await checkTwitterUser();
  if (twitterPageDetail && twitterPageDetail.userId) {
    if (lastCheckTwitterId !== twitterPageDetail.userId) {
      lastCheckTwitterId = twitterPageDetail.userId;
      const twitterInfo = await checkIsScamServer(
        twitterPageDetail.nickname || '',
        twitterPageDetail.userId || '',
      );

      if (twitterInfo.result) {
        return {
          result: true,
          slug: twitterPageDetail.userId,
          name: twitterPageDetail.nickname || '',
          twitterUsername: twitterPageDetail.userId || '',
          scamDataList: twitterInfo.scamDataList,
        };
      }
    }
  }
  return undefined;
}
