import { STORED_EVENT } from "../const";
import { set, get, subscribe } from ".";

const key = 'events';

export const getEvents = (): STORED_EVENT[] => get(key);

export const addEvent = (event: STORED_EVENT) => set(key, [...getEvents(), event]);

export const setEvent = (event: STORED_EVENT) => set(key, getEvents().map((i: STORED_EVENT) => i.id === event.id ? event : i));

export const subscribeOnEvents = (func: Function) => subscribe(key, func);