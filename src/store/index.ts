import { STORED_EVENT, MODAL_TYPE } from "../const";

interface Store {
  events: STORED_EVENT[]
  showEvent: STORED_EVENT,
  modal?: MODAL_TYPE
}

const store: Store = {
  events: [],
  showEvent: null,
  modal: null
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
}

export const get = (key: string) => store[key];