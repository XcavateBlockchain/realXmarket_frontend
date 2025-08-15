interface Schema {
  activeAccountAddress?: string;
  plutonication_key?: string;
}

type Key = keyof Schema;
type Value<K extends Key> = Schema[K];

export function getItem<K extends Key>(key: K): Value<K> {
  const parsed = JSON.parse(JSON.stringify(localStorage));
  return parsed[key];
}

export function setItem<K extends Key>(key: K, value: Exclude<Value<K>, undefined>) {
  let val: string;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  } else {
    val = value;
  }

  localStorage.setItem(key, val);
}

export async function deleteItem<K extends Key>(key: K) {
  localStorage.removeItem(key);
}

export const useLocalStorage = {
  getItem,
  setItem,
  deleteItem
};
