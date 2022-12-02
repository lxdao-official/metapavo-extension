import { RSS3Feed } from 'extension-common/src/apis/rss3_api';
import { AutoDecimalForToken } from 'extension-common/src/decimals';
import { getLang } from 'extension-common/src/lang';

export function getFeedTitle(feed: RSS3Feed) {
  const tag = feed.tag;
  const type = feed.type;
  const metadata = feed.metadata;

  try {
    if (tag == 'transaction') {
      if (type == 'transfer') {
        if (feed.parent.tag == 'collectible') {
          return (
            <span>{`[${getLang('cost')}] ${AutoDecimalForToken(
              metadata.value_display,
            )} ${metadata.symbol}`}</span>
          );
        }
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${AutoDecimalForToken(metadata.value_display)} ${
              metadata.symbol
            }`}
          </span>
        );
      } else if (type == 'bridge') {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${AutoDecimalForToken(metadata.token.value_display)} ${
              metadata.token.symbol
            } to ${metadata.target_network.name}`}
          </span>
        );
      }
    }
    if (tag == 'exchange') {
      if (type == 'swap') {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${AutoDecimalForToken(metadata.from.value_display)} ${
              metadata.from.symbol
            } to ${AutoDecimalForToken(metadata.to.value_display)} ${
              metadata.to.symbol
            }`}
          </span>
        );
      } else if (type == 'liquidity') {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${metadata.action} ${AutoDecimalForToken(
              metadata.from.value_display,
            )} ${metadata.from.symbol} to ${AutoDecimalForToken(
              metadata.to.value_display,
            )} ${metadata.to.symbol}`}
          </span>
        );
      } else if (type == 'bridge') {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${AutoDecimalForToken(metadata.token.value_display)} ${
              metadata.token.symbol
            } to ${metadata.target_network.name}`}
          </span>
        );
      } else {
        return (
          <span>
            [{getLang(tag + '_' + type)}]
            {` ${AutoDecimalForToken(metadata.value_display)} ${
              metadata.symbol
            }`}
          </span>
        );
      }
    }

    if (tag == 'collectible') {
      if (type == 'transfer' || type == 'mint' || type == 'burn') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[1]!}>{` ${metadata.name}`}</a>
          </>
        );
      }
      if (type == 'trade') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[1]!}>{` ${metadata.name} `}</a>
            <span>
              {getLang('cost')}: {metadata.cost.value_display}{' '}
              {metadata.cost.symbol}
            </span>
          </>
        );
      } else if (type == 'poap') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[1]!}>{` ${metadata.name}`}</a>
          </>
        );
      }
    }

    if (tag == 'governance') {
      if (type == 'vote') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.proposal.title}</a>
          </>
        );
      }
      if (type == 'propose') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.title}</a>
          </>
        );
      }
    }

    if (tag == 'donation') {
      if (type == 'launch') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.title}</a>
          </>
        );
      } else if (type == 'donate') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}> {metadata.title} </a>
            <span>
              Donate: {AutoDecimalForToken(metadata.token.value_display)}{' '}
              {metadata.token.symbol}
            </span>
          </>
        );
      }
    }
    if (tag == 'social') {
      if (type == 'post' || type == 'revise' || type == 'comment') {
        return (
          <>
            [{getLang(tag + '_' + type)}]
            <a href={feed.related_urls[0]!}>
              {' '}
              {metadata.title || metadata.body}
            </a>
          </>
        );
      }
    }
  } catch (e) {}

  return getLang(tag + '_' + type);
}
