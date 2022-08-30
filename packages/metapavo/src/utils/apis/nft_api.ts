import config from "../../config";
import { fetchWrapped } from "./fetch";
import { IProject } from "./types";

export async function getNftByTwitterId(twitterId: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/by_twitter/${twitterId}`, {}, false);
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getNftById(id: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/by_id/${id}`, {}, false);
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function findNftByAddress(address: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/by_address/${address}`, {}, false);
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

export async function searchProjects(keyword: string): Promise<IProject | null> {
  const res = await fetchWrapped(`${config.baseURL}/nfts/search/${keyword}`, {}, false);
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function findAllWebsite(): Promise<string[] | null> {
  return new Promise((resolve, reject) => {
    if (!chrome?.storage?.local) {
      reject("access_token is not found");
      return;
    }
    chrome.storage.local.get(["nft_website_all"], async function (data) {
      if (data.nft_website_all) {
        return resolve(data.nft_website_all.filter((item: string) => item));
      } else {
        const res = await fetchWrapped(`${config.baseURL}/nfts/websites/all`, {}, false);
        if (res && res.success) {
          chrome.storage.local.set({
            nft_website_all: res.data.filter((item: string) => item),
          });
          return resolve(res.data);
        }
      }
      reject(null);
    });
  });
}

export async function createVisitHistory(project_id: string) {
  const res = await fetchWrapped(`${config.baseURL}/visit-histories/create`, {
    method: "POST",
    body: JSON.stringify({
      project_id,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getVisitHistories(pageIndex = 1, pageSize = 10) {
  const res = await fetchWrapped(
    `${config.baseURL}/visit-histories/users/list?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      method: "GET",
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function addFavByProjectId(project_id: string) {
  const res = await fetchWrapped(`${config.baseURL}/favs/create`, {
    method: "POST",
    body: JSON.stringify({
      project_id,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function removeFavByProjectId(project_id: string) {
  const res = await fetchWrapped(`${config.baseURL}/favs/delete`, {
    method: "DELETE",
    body: JSON.stringify({
      project_id,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
/**
 * 获取用户的收藏列表
 * @returns
 */
export async function getUsersFavs(pageIndex: number = 1, pageSize: number = 20) {
  const res = await fetchWrapped(
    `${config.baseURL}/favs/user/list?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    {
      method: "GET",
    },
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}

export async function getUsersAlarms() {
  const res = await fetchWrapped(
    `${config.baseURL}/alarms/fromnow/list`,
    {
      method: "GET",
    },
    false,
  );
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function addAlarmForUser(alarm_at: Date, desc: string) {
  const res = await fetchWrapped(`${config.baseURL}/alarms`, {
    method: "POST",
    body: JSON.stringify({
      alarm_at,
      desc,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
export async function removeAlarmForUser(id: string) {
  const res = await fetchWrapped(`${config.baseURL}/alarms/${id}`, {
    method: "DELETE",
    body: JSON.stringify({
      id,
    }),
  });
  if (res && res.success) {
    return res.data;
  }
  return null;
}
