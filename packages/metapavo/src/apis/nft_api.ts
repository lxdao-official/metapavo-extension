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

export async function getNftById(id: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/by_id/${id}`);
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function findNftByAddress(address: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/by_address/${address}`);
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function findNftByURL(url: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/by_url/${encodeURIComponent(url)}`);
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function findAllWebsite(): Promise<string[] | null> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(["nft_website_all"], async function (data) {
      if (data.nft_website_all) {
        return resolve(data.nft_website_all);
      } else {
        const res = await fetchWrapped(`${config.baseURL}/nfts/websites/all`);
        if (res && res.success) {
          chrome.storage.local.set({
            nft_website_all: res.data,
          });
          return resolve(res.data);
        }
      }
      reject(null);
    });
  });
}
