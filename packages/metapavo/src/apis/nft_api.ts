import config from "../config";
import { fetchWrapped } from "./fetch";
import { IProject } from "./types";

export async function getNftByTwitterId(twitterId: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/by_twitter/${twitterId}`);
  if (res && res.success) {
    return res.data;
  }
  return null;
}
