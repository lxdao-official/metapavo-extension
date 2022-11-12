import { IProjectV2, Links } from './types';

export const projectLinksWrapper = (project: IProjectV2) => {
  const links: Links = {
    etherscan: project?.contractAddress
      ? `https://etherscan.io/address/${project.contractAddress}`
      : undefined,
    website: project?.externalUrl,
    opensea: project?.symbol
      ? `https://opensea.io/collection/${project.symbol}`
      : undefined,
    looksrare: project?.contractAddress
      ? `https://looksrare.org/collections/${project.contractAddress}`
      : undefined,
    x2y2: project?.symbol
      ? `https://x2y2.io/collection/${project.symbol}/items`
      : undefined,
    gem: project?.symbol
      ? `https://www.gem.xyz/collection/${project.symbol}`
      : undefined,
    sudoswap: project?.contractAddress
      ? `https://sudoswap.xyz/#/browse/buy/${project.contractAddress}`
      : undefined,
    twitter: project?.twitterUserName
      ? `https://twitter.com/${project.twitterUserName}`
      : undefined,
    discord: project?.discordUrl,
    nfteye: project?.symbol
      ? `https://nfteye.io/collections/${project.symbol}`
      : undefined,
    nftnerds: project?.contractAddress
      ? `https://nftnerds.ai/collection/${project.contractAddress}/liveview`
      : undefined,
  };
  project.links = links;
  return project;
};
