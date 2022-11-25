import { fetchByHost } from '../apis/dapps_api';

export async function recognizerDapp() {
  const res = await fetchByHost(window.location.host);

  return res;
}
