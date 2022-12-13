import { user_dapps } from '.';
import config from '../../config';
import { fetchWrapped } from './fetch';
import { IProject, IProjectV2, PagedDto, favs } from './types';

export async function getNftByTwitterId(
  twitterId: string,
): Promise<IProject | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_twitter/${twitterId}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getNftById(id: string): Promise<IProject | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_id/${id}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function findNftByAddress(
  address: string,
): Promise<IProject | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_address/${address}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function findNftByURL(url: string): Promise<IProject | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/by_url/${encodeURIComponent(url)}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function searchProjects(
  keyword: string,
): Promise<IProject | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/nfts/search/${keyword}`,
    {},
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function findAllWebsite(): Promise<string[] | null> {
  return new Promise((resolve, reject) => {
    if (!chrome?.storage?.local) {
      reject('local is not found');
      return;
    }
    chrome.storage.local.get(
      ['nft_website_all', 'nft_website_all_timestamp'],
      async function (data) {
        if (data && data.nft_website_all && data.nft_website_all.length) {
          if (
            data.nft_website_all_timestamp &&
            new Date().getTime() - data.nft_website_all_timestamp <
              24 * 60 * 60 * 1000
          ) {
            return resolve(data.nft_website_all.filter((item: string) => item));
          }
        }
        const res = await fetchWrapped(
          `${config.baseURL}/nfts/websites/all`,
          {},
          false,
        );
        if (res && res.success && res.data && res.data.length) {
          chrome.storage.local.set({
            nft_website_all: res.data.filter((item: string) => item),
            nft_website_all_timestamp: new Date().getTime(),
          });
          return resolve(res.data);
        }
        reject(null);
      },
    );
  });
}

export async function isFaved(project_id: number) {
  const res = await fetchWrapped(
    `${config.baseURL}/favs/is_faved/${project_id}`,
    {
      method: 'GET',
    },
  );
  if (res && res.success) {
    return res.data.faved;
  }
  return null;
}
export async function addFavByProjectId(project_id: number) {
  const res = await fetchWrapped(`${config.baseURL}/favs/create`, {
    method: 'POST',
    body: JSON.stringify({
      project_id,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function removeFavByProjectId(project_id: number) {
  const res = await fetchWrapped(
    `${config.baseURL}/favs/delete/${project_id}`,
    {
      method: 'DELETE',
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}
/**
 * 获取用户的收藏列表
 * @returns
 */
export async function getUsersFavs(
  pageIndex: number = 1,
  pageSize: number = 100,
): Promise<PagedDto<favs> | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/favs/user/list?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getUserDapps(
  pageIndex: number = 1,
  pageSize: number = 20,
): Promise<PagedDto<user_dapps> | null> {
  const res = await fetchWrapped(
    `${config.baseURL}/dapps/installed?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      method: 'GET',
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getUsersAlarms() {
  const res = await fetchWrapped(`${config.baseURL}/alarms/fromnow/list`, {
    method: 'GET',
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function getUsersAlarmsNoLogin() {
  const res = await fetchWrapped(
    `${config.baseURL}/alarms/fromnow/list`,
    {
      method: 'GET',
    },
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getUsersAlarmsList(timestamp: number) {
  const res = await fetchWrapped(
    `${config.baseURL}/alarms/fromnow/list/${timestamp}`,
    {
      method: 'GET',
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function addAlarmForUser(
  alarm_at: Date,
  desc: string,
  url?: string,
  color?: string,
) {
  const res = await fetchWrapped(`${config.baseURL}/alarms`, {
    method: 'POST',
    body: JSON.stringify({
      alarm_at,
      desc,
      color,
      url,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function removeAlarmForUser(id: string) {
  const res = await fetchWrapped(`${config.baseURL}/alarms/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      id,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function settingCounts() {
  const res = await fetchWrapped(`${config.baseURL}/users/me/setting_counts`, {
    method: 'GET',
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function reportCreate(
  url: string,
  project_type: string,
  project_name: string,
  is_scam = false,
) {
  const res = await fetchWrapped(`${config.baseURL}/reports`, {
    method: 'POST',
    body: JSON.stringify({
      url,
      project_type,
      project_name,
      is_scam,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
