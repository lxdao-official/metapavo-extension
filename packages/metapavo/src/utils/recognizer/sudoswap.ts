export async function recognizerSudoswap() {
  if (window.location.host.indexOf("sudoswap.xyz") === -1) return;

  const detailMatchResult = window.location.href.match(/\/browse\/buy\/([a-zA-Z0-9]*)/);
  if (detailMatchResult && detailMatchResult[1]) {
    return {
      contract: detailMatchResult[1],
    };
  }
  return null;
}
