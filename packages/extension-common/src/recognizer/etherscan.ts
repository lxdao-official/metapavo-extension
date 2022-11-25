export async function recognizerEtherscan() {
  if (window.location.host.indexOf("etherscan.io") === -1) return;

  const detailMatchResult = window.location.href.match(
    /etherscan\.io\/(token|address)\/([a-zA-Z0-9]*)/,
  );
  if (detailMatchResult && detailMatchResult[2]) {
    return {
      contract: detailMatchResult[2],
    };
  }
  return null;
}
