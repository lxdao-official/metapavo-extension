import config from '../../../config';
import {
  checkTwitterScam as _checkTwitterScam,
  checkTwitterUser,
} from '../twitter';

async function checkIsScamServer(name?: string) {
  if (!name) return undefined;
  const res = await fetch(
    `${config.baseURL}/users/twitter/scam/check?name=${name}`,
  );
  const json = await res.json();
  return json.data;
}
let lastCheckTwitterId: string | null = null;
export async function checkTwitterScam() {
  if (window.location.host.indexOf('twitter.com') === -1) return undefined;

  const twitterPageDetail = await checkTwitterUser();
  if (twitterPageDetail && twitterPageDetail.userId) {
    if (lastCheckTwitterId !== twitterPageDetail.userId) {
      lastCheckTwitterId = twitterPageDetail.userId;
      const twitterInfo = await checkIsScamServer(
        twitterPageDetail.nickname || '',
      );
      if (twitterInfo) {
        return {
          slug: twitterPageDetail.userId,
          name: twitterPageDetail.nickname || '',
          twitterUsername: twitterPageDetail.userId || '',
        };
      }
    }
  }
  return undefined;
}
