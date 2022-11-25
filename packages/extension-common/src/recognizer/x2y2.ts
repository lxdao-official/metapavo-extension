export async function recognizerX2Y2() {
  if (window.location.host.indexOf("x2y2.io") === -1) return;
  const matchResult = window.location.href.match(/x2y2\.io\/collection\/([a-zA-Z0-9_-]*)/);
  if (matchResult && matchResult[1]) {
    return {
      id: matchResult[1],
    };
  } else {
    //opensea.io/assets/ethereum/ethereum/0x23581767a106ae21c074b2276d25e5c3e136a68b
    const detailMatchResult = window.location.href.match(
      /x2y2\.io\/eth\/([a-zA-Z0-9]*)\/([a-zA-Z0-9]*)/,
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
