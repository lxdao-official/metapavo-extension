export type IProject = {
  id: string;
  status: number;
  name: string;
  describe: string | null;
  image_url: string | null;
  external_url: string | null;
  white_paper_url: string | null;
  github: string | null;
  tags: string | null;
  market_cap_rank: string | null;
  api_id: string | null;
  creator_fees: number | null;
  num_owners: number | null;
  total_sales: number | null;
  one_day_sales: number | null;
  thirty_day_sales: number | null;
  seven_day_sales: number | null;
  one_day_volume: string | null;
  thirty_day_volume: string | null;
  seven_day_volume: string | null;
  traits: string | null;
  market_cap: string | null;
  floor_price: string | null;
  created_date: string | null;
  total_supply: string | null;
  max_supply: string | null;
  current_supply: string | null;
  source: number;
  type: number;
  discord_url: string | null;
  twitter_username: string | null;
  instagram_username: string | null;
  facebook_username: string | null;
  contract_address: string | null;
  contract_is_verified: number | null;
  create_time: Date;
  update_time: Date;
  faved: boolean | null;
};
export type IVisitHistory = {
  id: string;
  user_id: string;
  project_id: string;
  project_type: number | null;
  created_at: Date;
  updated_at: Date | null;
  project: IProject;
};

export type IFavs = {
  id: string;
  user_id: string;
  project_id: string;
  project_type: number | null;
  created_at: Date;
  updated_at: Date | null;
  project: IProject;
};

export interface IProjectV2 {
  id: number;
  status: number;
  name: string;
  symbol: string;
  describe: string;
  imageUrl: string;
  externalUrl: string;
  type: number;
  discordUrl: string;
  twitterUserName: string;
  facebookUserName: string;
  contractAddress: string;
  nftProjectInfo?: NftProjectInfo;
  contractData?: ContractData;
  createTime: string;
  updateTime: string;
  links?: Links;
}
export interface Links {
  etherscan?: string;
  website?: string;
  opensea?: string;
  gem?: string;
  looksrare?: string;
  x2y2?: string;
  sudoswap?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
  nfteye?: string;
  nftnerds?: string;
  rss3?: string;
}
export interface NftProjectInfo {
  id: number;
  name: string;
  slug: string;
  traits: string;
  createdDate: string;
  stats: Stat[];
  contractAddress: string;
  createTime: string;
  updateTime: string;
}

export interface Stat {
  source: number;
  numOwners: number;
  oneDayVolume: string;
  oneDaySales: number;
  oneDayChange: number;
  oneDayDifference: number;
  thirtyDayVolume: string;
  thirtyDaySales: number;
  sevenDayVolume: string;
  sevenDaySales: number;
  totalVolume: string;
  totalSales: number;
  totalSupply: string;
  marketCap: string;
  floorPrice: string;
  sellerFees: number;
  openseaFees: number;
}

export interface ContractData {
  id: number;
  address: string;
  isVerified: number;
  type: number;
  source: number;
  createdDate: string;
  createTime: string;
  updateTime: string;
}
export interface PagedDto<T> {
  current: number;
  size: number;
  data?: T[];
  records?: T[];
  total?: number;
}
export type favs = {
  id: string;
  user_id: string;
  created_at: Date;
  updated_at: Date | null;
  project_id: number;
  project_type: number | null;
  project?: IProjectV2;
};
export type visit_histories = {
  id: string;
  user_id: string;
  project_id: number;
  project_type: number | null;
  created_at: Date;
  updated_at: Date | null;
  project?: IProjectV2;
};
