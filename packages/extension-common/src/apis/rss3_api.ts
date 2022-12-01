export type RSS3Tag =
  | 'collectible'
  | 'transaction'
  | 'exchange'
  | 'social'
  | 'donation'
  | 'governance';

export type RSS3Type =
  | 'transfer'
  | 'mint'
  | 'burn'
  | 'bridge'
  | 'withdraw'
  | 'deposit'
  | 'swap'
  | 'liquidity'
  | 'collectible'
  | 'transfer'
  | 'trade'
  | 'mint'
  | 'burn'
  | 'poap'
  | 'social'
  | 'post'
  | 'revise'
  | 'comment'
  | 'share'
  | 'profile'
  | 'donation'
  | 'launch'
  | 'donate'
  | 'governance'
  | 'propose'
  | 'vote';

export interface RSS3Feed {
  timestamp: string;
  hash: string;
  owner: string;
  fee: string;
  address_from: string;
  address_to: string;
  network: string;
  tag: RSS3Tag;
  type: RSS3Type;
  success: boolean;
  created_at: string;
  updated_at: string;
  metadata: any;
  related_urls: string[];
  parent: RSS3Feed;
}

// export interface RSS3TransactionMetadata {
//   name: string;
//   image: string;
//   value: string;
//   symbol: string;
//   decimals: number;
//   standard: string;
//   value_display: string;
// }

export interface RSS3CollectibleMetadata {}
export async function getFeeds(
  address: string,
  cursor: string | null,
): Promise<{
  total: number;
  result: RSS3Feed[];
  cursor: string;
}> {
  const res = await fetch(
    `https://pregod.rss3.dev/v1/notes/${address}?limit=50&include_poap=false&count_only=false&query_status=false` +
      (cursor ? `&cursor=${cursor}` : ''),
  );
  const json = await res.json();
  return json;
}
