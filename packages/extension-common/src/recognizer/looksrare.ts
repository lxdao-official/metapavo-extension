export async function recognizerLooksrare() {
  if (window.location.host.indexOf("looksrare.org") === -1) return;
  const matchResult = window.location.href.match(/\/collections\/([a-zA-Z0-9_-]*)/);
  if (matchResult && matchResult[1]) {
    return {
      contract: matchResult[1],
    };
  } else {
    const detailMatchResult = window.location.href.match(
      /\/collections\/([a-zA-Z0-9]*)\/([a-zA-Z0-9]*)/,
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
