import { checkTwitterScam as _checkTwitterScam, checkTwitterUser } from "../twitter";
let lastCheckTwitterId: string | null = null;
export async function checkTwitterScam() {
  if (window.location.host.indexOf("twitter.com") === -1) return undefined;

  const twitterPageDetail = await checkTwitterUser();
  if (twitterPageDetail && twitterPageDetail.userId) {
    if (lastCheckTwitterId !== twitterPageDetail.userId) {
      lastCheckTwitterId = twitterPageDetail.userId;
      const twitterInfo = await _checkTwitterScam(twitterPageDetail);
      if (twitterInfo?.detectResult) {
        return twitterInfo.detectResult;
      }
    }
  }
  return undefined;
}
