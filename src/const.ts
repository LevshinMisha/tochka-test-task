export enum EVENT_FIELD_TYPE_ENUM {
  NUMBER,
  CURRENCY,
  TEXT,
  TEXTAREA,
  DATE,
  BALANCE,
  READ
}

export interface EVENT_FIELD {
  type: EVENT_FIELD_TYPE_ENUM,
  title: string
  showInList: boolean
  hideOnCreate?: boolean
  mask?: {
    regexp: RegExp,
    errorMessage: string
  }
}

export interface EVENT {
  name: string,
  fields: EVENT_FIELD[]
}

export interface STORED_EVENT {
  id: string
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
        showInList: true,
        mask: {
          regexp: /[1-9][0-9]*/,
          errorMessage: 'Сумма должна быть положительная'
        }
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.CURRENCY,
        title: 'Валюта',
        showInList: true,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXT,
        title: 'От кого транзакция',
        showInList: true,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXTAREA,
        title: 'Описание',
        showInList: false,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.BALANCE,
        title: 'Приход или расход',
        showInList: true,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.DATE,
        title: 'Дата',
        showInList: true,
      },
    ]
  },
  NEWS: {
    name: 'Новость',
    fields: [
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXT,
        title: 'Заголовок',
        showInList: true,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXTAREA,
        title: 'Содержание',
        showInList: false,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.READ,
        title: 'Ознакомлен',
        showInList: false,
        hideOnCreate: true,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.DATE,
        title: 'Дата',
        showInList: false,
      },
    ]
  },
  REQUEST: {
    name: 'Запрос перевода',
    fields: [
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXT,
        title: 'Имя',
        showInList: true,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXT,
        title: 'Счет',
        showInList: true,
        mask: {
          regexp: /^51401792[0-9]{8}$/,
          errorMessage: 'Счет должен состоять из 16 цифр и принадлежать нашему банку!'
        }
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.NUMBER,
        title: 'Сумма перевода',
        showInList: true,
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.DATE,
        title: 'Дата',
        showInList: true,
      },
    ]
  },
}

export enum MODAL_TYPE {
  ADD_EVENT,
  SHOW_EVENT
}

export enum SORT_TYPE {
  DATE_ASK,
  DATE_DESC,
  TYPE_ASK,
  TYPE_DESC,
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

export const READ_TEXTS = {
  READ: 'ознакомлен',
  NOT_READ: 'не ознакомлен'
}