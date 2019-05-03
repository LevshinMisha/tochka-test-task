import { set, subscribe, get } from ".";
import { STORED_EVENT } from "../const";

const key = 'showEvent';

export const setShowEvent = (event: STORED_EVENT) => set(key, event);

export const getShowEvent = (): STORED_EVENT => get(key);

export const subscribeOnShowEvent = (func: Function) => subscribe(key, func);