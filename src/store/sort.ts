import { set, subscribe, get } from ".";
import { SORT_TYPE } from "../const";

const key = 'sort';

export const setSort = (sort: SORT_TYPE) => set(key, sort);

export const getSort = (): SORT_TYPE => get(key);

export const subscribeOnSort = (func: Function) => subscribe(key, func);