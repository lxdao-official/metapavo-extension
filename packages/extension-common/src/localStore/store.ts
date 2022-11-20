export function getListConfig<T>(key: string, defaultValue: T[]): T[] {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (e) {}
  }
  return defaultValue;
}

export function setListConfig<T>(key: string, value: T[]) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function addListConfigItem<T>(key: string, value: T) {
  const list = getListConfig<T>(key, []);
  list.push(value);
  setListConfig(key, list);
}

export function removeListConfigItem<T>(key: string, value: T) {
  const list = getListConfig<T>(key, []);
  const index = list.indexOf(value);
  if (index > -1) {
    list.splice(index, 1);
  }
  setListConfig(key, list);
}

export function clearListConfig(key: string) {
  setListConfig(key, []);
}
