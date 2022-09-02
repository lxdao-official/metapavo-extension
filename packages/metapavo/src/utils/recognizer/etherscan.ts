export async function recognizerEtherscan() {
  if (window.location.host.indexOf("etherscan.io") === -1) return;

  const detailMatchResult = window.location.href.match(/etherscan\.io\/token\/([a-zA-Z0-9]*)/);
  if (detailMatchResult && detailMatchResult[1]) {
    return {
      contract: detailMatchResult[1],
    };
  }
  return null;
}
