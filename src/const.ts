export enum EVENT_FIELD_ENUM {
  NUMBER,
  CURRENCY,
  TEXT,
  TEXTAREA,
  MONEY1, 
  DATE,
}

interface IEvents {
  [s: string]: {
    name: string,
    fields: {
      type: EVENT_FIELD_ENUM,
      title: string,
      showInList: boolean
    }[]
  }
}

export const EVENTS: IEvents = {
  FINANCE: {
    name: 'Финансовая транзакция',
    fields: [
      {
        type: EVENT_FIELD_ENUM.NUMBER,
        title: 'Сумма транзакции',
        showInList: true
      },
      {
        type: EVENT_FIELD_ENUM.CURRENCY,
        title: 'Валюта',
        showInList: true
      },
      {
        type: EVENT_FIELD_ENUM.TEXT,
        title: 'От кого транзакция',
        showInList: true
      },
      {
        type: EVENT_FIELD_ENUM.TEXTAREA,
        title: 'Описание',
        showInList: false
      },
      {
        type: EVENT_FIELD_ENUM.CURRENCY,
        title: 'Приход или расход',
        showInList: true
      },
      {
        type: EVENT_FIELD_ENUM.DATE,
        title: 'Дата',
        showInList: true
      },
    ]
  }
}

export enum MODAL_TYPE {
  ADD_EVENT
}