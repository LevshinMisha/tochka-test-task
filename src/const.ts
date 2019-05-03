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
  default?: string
  editable: boolean
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
        editable: false,
        mask: {
          regexp: /[1-9][0-9]*/,
          errorMessage: 'Сумма должна быть положительная'
        }
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.CURRENCY,
        title: 'Валюта',
        showInList: true,
        editable: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXT,
        title: 'От кого транзакция',
        showInList: true,
        editable: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXTAREA,
        title: 'Описание',
        showInList: false,
        editable: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.BALANCE,
        title: 'Приход или расход',
        showInList: true,
        editable: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.DATE,
        title: 'Дата',
        showInList: true,
        editable: false
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
        editable: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.TEXTAREA,
        title: 'Содержание',
        showInList: false,
        editable: false
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.READ,
        title: 'Ознакомлен',
        showInList: false,
        default: 'false',
        editable: true
      },
      {
        type: EVENT_FIELD_TYPE_ENUM.DATE,
        title: 'Дата',
        showInList: true,
        editable: false
      },
    ]
  }
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