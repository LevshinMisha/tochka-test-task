import { STORED_EVENT, MODAL_TYPE, SORT_TYPE } from "../const";

interface Store {
  events: STORED_EVENT[]
  showEvent: STORED_EVENT,
  modal?: MODAL_TYPE,
  sort: SORT_TYPE
}

const store: Store = {
  events: [],
  showEvent: null,
  modal: null,
  sort: SORT_TYPE.NONE
}

interface Subscribed {
  key: string,
  func: Function
}

const subscribed: Subscribed[] = [];

export const subscribe = (key: string, func: Function) => {
  subscribed.push({ key, func })
}

export const set = (key: string, value: any) => {
  store[key] = value;
  subscribed.filter(i => i.key === key).forEach(i => i.func());
  localStorage.setItem('storage', JSON.stringify(store));
}

export const get = (key: string) => store[key];

export const restoreStorage = () => {
  const restoredData = JSON.parse(localStorage.getItem('storage'));
  Object.keys(restoredData).forEach(key => set(key, restoredData[key]));
}