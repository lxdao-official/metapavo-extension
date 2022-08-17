import { findAllWebsite } from "../apis/nft_api";

export async function recognizerWebsite() {
  const websites = await findAllWebsite();
  if (!websites) return null;
  const matchedURL = websites.find((website) => window.location.href.indexOf(website) != -1);

  return matchedURL;
}
