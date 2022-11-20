import toast from 'react-hot-toast';

import { dapps, user_dapps_catogories } from '.';
import config from '../../../../../../config';
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

export function installDapp(dapp_id: string, category_id?: string) {
  return fetchWrapped(
    `${config.baseURL}/dapps/${dapp_id}/install?categoryId=${category_id}`,
    {
      method: 'GET',
    },
  );
}

export async function fetchUsersCategory(): Promise<user_dapps_catogories[]> {
  try {
    const res = await fetchWrapped(
      `${config.baseURL}/dapps/user_dapp_categories`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (res && res.success) {
      return res.data;
    } else {
      toast.error(res.message);
    }
  } catch (e: any) {
    toast.error(e.message);
  }

  return [];
}
