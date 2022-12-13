import { fetchWrapped } from "./fetch";
import config from "../../config";
export interface IKOL {
  id: number
  username: string
  status: number
  name: string
  bio: string
  location: string
  website: string
  imageUrl: string
  following: number
  followers: number
  numTweets: number
  createdDate: string
  type: number
  source: number
  tags: string
  avatar: string
  mentionedTopics: string
  mentionedCoins: string
  mentionedKols: string
  createTime: string
  updateTime: string
}

export async function searchKols(keyword:string):Promise<IKOL[]> {
  const res = await fetchWrapped(
    config.dataService + '/api/v1/community/searchList?username='+keyword,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (res && res.success) {
    return res.result;
  }
  throw new Error(res.message)
}
