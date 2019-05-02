import { MODAL_TYPE } from "../const";
import { set, subscribe, get } from ".";

const key = 'modal';

export const closeModal = () => set(key, null);

export const isModalOpen = (modalType: MODAL_TYPE) => get(key) === modalType;

export const openModal = (modalType: MODAL_TYPE) => set(key, modalType);

export const subscribeOnModal = (func: Function) => subscribe(key, func);

