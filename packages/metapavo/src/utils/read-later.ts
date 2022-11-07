export interface LinkLater {
  link: string;
  title: string;
  icon?: string;
  create_at: number;
}

const MAX_LENGTH = 50;

export const getLogo = async (host: string) => {
  try {
    const res = await fetch(
      'https://favicongrabber.com/api/grab/' +
        host.replace(/http(s)?:\/\//, ''),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await res.json();
    const img = json.icons[0].src;
    return img;
  } catch (e) {
    return '';
  }
};
export async function getList(): Promise<LinkLater[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['read_later'], function (data) {
      if (data && data.read_later) {
        resolve(data.read_later);
      } else {
        resolve([]);
      }
    });
  });
}

export async function addItem(link: string, title: string, icon?: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['read_later'], function (data) {
      let read_later: LinkLater[] = [];
      if (data && data.read_later) {
        read_later = data.read_later;
      }
      // remove duplicate
      read_later = read_later.filter((item: LinkLater) => item.link !== link);
      read_later.push({
        link,
        title,
        icon,
        create_at: Date.now(),
      });
      if (read_later.length > MAX_LENGTH) {
        read_later = read_later.slice(read_later.length - MAX_LENGTH);
      }
      chrome.storage.local.set({ read_later }, function () {
        resolve(read_later);
      });
    });
  });
}
