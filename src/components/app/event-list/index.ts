import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"
import { SORT_TYPE, MODAL_TYPE, EVENTS, EVENT_FIELD_TYPE_ENUM } from "../../../const";
import EventListItem from "./event-list-item";
import { getEvents, subscribeOnEvents } from "../../../store/events";
import { subscribeOnSort, getSort } from "../../../store/sort";

interface Props {}

interface State {}

const findOneDifferentElement = (array1: any[], array2: any[]) => array1.find(i => !(array2.indexOf(i) + 1));

const getDate = (listItem: EventListItem) => {
  const event = Object.keys(EVENTS).map(i => EVENTS[i]).find(i => i.name === listItem.getEvent().name);
  const dateIndex = event.fields.findIndex(i => i.type === EVENT_FIELD_TYPE_ENUM.DATE);
  const date = listItem.getEvent().fields[dateIndex];
  return date;
}

const getName = (listItem: EventListItem) => listItem.getEvent().name;

const sortByDate = (ask: boolean) => (listItem1: EventListItem, listItem2: EventListItem) => {
  const mult = ask ? -1 : 1;
  const date1 = getDate(listItem1);
  const date2 = getDate(listItem2);
  return date1 >= date2 ? -1 * mult : 1 * mult;
}

const sortByName = (ask: boolean) => (listItem1: EventListItem, listItem2: EventListItem) => {
  const mult = ask ? -1 : 1;
  const name1 = getName(listItem1);
  const name2 = getName(listItem2);
  return name1 >= name2 ? -1 * mult : 1 * mult;
}

const appendItem = (sortedList: EventListItem[], value: string, func: Function, ask: boolean) {

}

class EventList extends Component<Props, State> {
  listItems: EventListItem[]
  constructor(props: Props) {
    super(props);
    this.sortItems = this.sortItems.bind(this);
    this.addEventToDOM = this.addEventToDOM.bind(this);
    this.addEventToList = this.addEventToList.bind(this);
    this.getSortedList = this.getSortedList.bind(this);
    subscribeOnEvents(() => {
      if (getEvents().length > 1)
        if (this.listItems.length) {
          const events = getEvents();
          const eventsId = events.map(i => i.id);
          const existedEventsId = this.listItems.map(i => i.getEvent().id);
          if (eventsId.length > existedEventsId.length)
            this.addEventToList(findOneDifferentElement(eventsId, existedEventsId))
          else if (eventsId.length < existedEventsId.length)
            this.removeEventFromList(findOneDifferentElement(existedEventsId, eventsId))
          else
            for (let i = 0; i < events.length; i++)
              if (JSON.stringify(events[i].fields) !== JSON.stringify(this.listItems[i].getEvent().fields))
                return this.listItems[i].replaceProps({ event: events[i]})
        } else {
          this.reRender();
          this.sortItems();
        }
        
      else 
        this.reRender();
    });
    subscribeOnSort(this.sortItems);
  }

  addEventToDOM(listItem: EventListItem, valueFunc: Function, ask: boolean) {
    const sortedList = this.getSortedList().filter(i => i.getEvent().id !== listItem.getEvent().id);
    const valueToCompare = valueFunc(listItem);
    for (let i = 0; i < sortedList.length; i++) {
      const value = valueFunc(sortedList[i]);
      if (ask ? valueToCompare <= value : valueToCompare >= value)
        return this.rootElement.insertBefore(listItem.render(), sortedList[i].rootElement)
    }
    return this.rootElement.appendChild(listItem.render());
  }

  addEventToList(id: string) {
    const listItem = new EventListItem({ event: getEvents().find(i => i.id === id) });
    this.listItems.push(listItem);
    switch (getSort()) {
      case (SORT_TYPE.NONE):
        return this.rootElement.appendChild(listItem.render());
      case (SORT_TYPE.DATE_ASK):
      case (SORT_TYPE.DATE_DESC):
        return this.addEventToDOM(listItem, getDate, getSort() === SORT_TYPE.DATE_ASK)
      case (SORT_TYPE.TYPE_ASK):
      case (SORT_TYPE.TYPE_DESC):
        return this.addEventToDOM(listItem, getName, getSort() === SORT_TYPE.TYPE_ASK)
    }
  }

  removeEventFromList(eventId: string) {
    const item = this.listItems.find(i => i.getEvent().id === eventId);
    this.listItems = this.listItems.filter(i => i.getEvent().id !== eventId);
    item.remove();
  }

  sortItems() {
    return this.getSortedList().forEach(item => this.rootElement.appendChild(item.rootElement));
  }

  getSortedList() {
    switch (getSort()) {
      case (SORT_TYPE.NONE):
        return this.listItems;
      case (SORT_TYPE.DATE_ASK):
      case (SORT_TYPE.DATE_DESC):
        return [...this.listItems].sort(sortByDate(SORT_TYPE.DATE_ASK === getSort()));
      case (SORT_TYPE.TYPE_ASK):
      case (SORT_TYPE.TYPE_DESC):
        return [...this.listItems].sort(sortByName(SORT_TYPE.TYPE_ASK === getSort()));
    }
  }

  render() {
    this.listItems = getEvents().map(event => new EventListItem({ event }));
    if (getEvents().length)
      return DOM.update(this.rootElement, {
        class: 'event-list',
        childrens: this.getSortedList().map(i => i.render())
      })
    return DOM.update(this.rootElement, {
      classList: ['event-list', 'event-list--empty'],
      childrens: [
        DOM.span('event-list__empty-message', 'Лист сейчас пуст, нажмите кнопку ниже, чтобы добавить в него что-нибудь.')
      ]
    });
  }
}

export default EventList;