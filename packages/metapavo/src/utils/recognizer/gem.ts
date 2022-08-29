export async function recognizerGEM() {
  if (window.location.host.indexOf("gem.xyz") === -1) return;
  const matchResult = window.location.href.match(/gem\.xyz\/collection\/([a-zA-Z0-9_-]*)/);
  if (matchResult && matchResult[1]) {
    return {
      id: matchResult[1],
    };
  } else {
    const detailMatchResult = window.location.href.match(
      /gem\.xyz\/asset\/([a-zA-Z0-9]*)\/([a-zA-Z0-9]*)/,
    );
    if (detailMatchResult && detailMatchResult[1] && detailMatchResult[2]) {
      return {
        contract: detailMatchResult[1],
        tokenId: detailMatchResult[2],
      };
    }
  }
  return null;
}
