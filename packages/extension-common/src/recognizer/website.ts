import { findAllWebsite } from '../apis/nft_api';

export async function recognizerWebsite() {
  const websites = await findAllWebsite();
  if (!websites) return null;
  const matches = websites
    .filter(
      (website) =>
        window.location.href.indexOf(
          website.replace(/http:\/\/|https:\/\//, '').replace(/^www\./, ''),
        ) !== -1,
    )
    .sort();
  if (!matches.length) return null;
  const matchedURL = matches[0];
  return matchedURL;
}
