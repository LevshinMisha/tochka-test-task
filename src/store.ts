import { STORED_EVENT } from "./const";

interface Store {
  events: any[]
}

const store: Store = {
  events: []
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