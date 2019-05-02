export enum EVENT_FIELD_TYPE_ENUM {
  NUMBER,
  CURRENCY,
  TEXT,
  TEXTAREA,
  DATE,
  BALANCE
}

export interface EVENT_FIELD {
  type: EVENT_FIELD_TYPE_ENUM,
  title: string
  showInList: boolean
}

export interface EVENT {
  name: string,
  fields: EVENT_FIELD[]
}

export interface STORED_EVENT {
  name: string,
  fields: string[]
}

export interface IEVENTS {
  [s: string]: EVENT
}

export const EVENTS: IEVENTS = {
  FINANCE: {
    name: 'Финансовая транзакция',
    fields: [
      {
        type: EVENT_FIELD_TYPE_ENUM.NUMBER,
        title: 'Сумма транзакции',
        showInList: true
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.CURRENCY,
        title: 'Валюта',
        showInList: true
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXT,
        title: 'От кого транзакция',
        showInList: true
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXTAREA,
        title: 'Описание',
        showInList: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.BALANCE,
        title: 'Приход или расход',
        showInList: true
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.DATE,
        title: 'Дата',
        showInList: true
      },
    ]
  },
  NEWS: {
    name: 'Новость',
    fields: [
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXT,
        title: 'Заголовок',
        showInList: true
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXTAREA,
        title: 'Содержание',
        showInList: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.DATE,
        title: 'Дата',
        showInList: false
      },
    ]
  }
}

export enum MODAL_TYPE {
  ADD_EVENT
}

export enum SORT_TYPE {
  ASK,
  DESC,
  NONE
}

export const CURRENCY_OPTIONS: string[] = [
  "Рубли",
  "Доллары",
  "Евро",
  "Бонусы"
]

export const BALANCE_TEXTS = {
  PLUS: '+приход',
  MINUS: '-расход'
}