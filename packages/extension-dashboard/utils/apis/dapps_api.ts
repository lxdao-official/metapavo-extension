import { dapps } from '.';
import config from '../../config';
import { fetchWrapped } from './fetch';

export async function searchDapps(keyword: string): Promise<dapps[]> {
  const res = await fetchWrapped(
    `${config.baseURL}/dapps/search/${keyword}`,
    {},
  );
  if (res && res.success) {
    return res.data;
  }
  return [];
}

export function addViewLog(dapp: dapps) {
  const logs = localStorage.getItem('dapp_viewLogs');
  const viewLogs = logs ? JSON.parse(logs) : [];
  const index = viewLogs.findIndex((log: dapps) => log.id === dapp.id);
  if (index > -1) {
    viewLogs.splice(index, 1);
  }
  viewLogs.unshift(dapp);
  localStorage.setItem('dapp_viewLogs', JSON.stringify(viewLogs));
}

export function getViewLogs() {
  const logs = localStorage.getItem('dapp_viewLogs');
  return logs ? JSON.parse(logs) : [];
}
