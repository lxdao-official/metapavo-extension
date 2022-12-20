export async function recognizerBlur() {
  if (window.location.host.indexOf('blur.io') === -1) return;
  const matchResult = window.location.href.match(
    /blur\.io\/.*collection\/([a-zA-Z0-9_-]*)/,
  );
  if (matchResult && matchResult[1]) {
    return {
      id: matchResult[1],
    };
  } else {
  }
  return null;
}
