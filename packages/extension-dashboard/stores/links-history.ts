interface LinkHistory {
  link: string;
  title: string;
  icon?: string;
  create_at: number;
}

const MAX_LENGTH = 50;

export async function getHistory(): Promise<LinkHistory[]> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['links_history'], function (data) {
      if (data && data.links_history) {
        resolve(data.links_history);
      } else {
        resolve([]);
      }
    });
  });
}

export async function addHistory(link: string, title: string, icon?: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['links_history'], function (data) {
      let links_history: LinkHistory[] = [];
      if (data && data.links_history) {
        links_history = data.links_history;
      }
      // remove duplicate
      links_history = links_history.filter(
        (item: LinkHistory) => item.link !== link,
      );
      links_history.push({
        link,
        title,
        icon,
        create_at: Date.now(),
      });
      if (links_history.length > MAX_LENGTH) {
        links_history = links_history.slice(links_history.length - MAX_LENGTH);
      }
      chrome.storage.local.set({ links_history }, function () {
        resolve(links_history);
      });
    });
  });
}
