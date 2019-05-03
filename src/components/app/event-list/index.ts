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

const sortByDate = (ask: boolean) => (listItem1: EventListItem, listItem2: EventListItem) => {
  const mult = ask ? -1 : 1;
  const date1 = getDate(listItem1);
  const date2 = getDate(listItem2);
  return date1 >= date2 ? -1 * mult : 1 * mult;
}

class EventList extends Component<Props, State> {
  listItems: EventListItem[]
  constructor(props: Props) {
    super(props);
    subscribeOnEvents(() => {
      if (getEvents().length > 1) {
        const events = getEvents();
        const eventsId = events.map(i => i.id);
        const existedEventsId = this.listItems.map(i => i.getEvent().id);
        if (eventsId.length > existedEventsId.length) {
          this.addEventToList(findOneDifferentElement(eventsId, existedEventsId))
        } else if (eventsId.length < existedEventsId.length) {
          this.removeEventFromList(findOneDifferentElement(existedEventsId, eventsId))
        } else {
          for (let i = 0; i < events.length; i++) {
            if (JSON.stringify(events[i].fields) !== JSON.stringify(this.listItems[i].getEvent().fields)) {
              this.listItems[i].replaceProps({ event: events[i]})
              return;
            }
          }
        }
      } else 
        this.reRender();
    });
    subscribeOnSort(() => this.sortItems());
    this.appendItem = this.appendItem.bind(this);
  }

  addEventToList(id: string) {
    const event = getEvents().find(i => i.id === id);
    const listItem = new EventListItem({ event });
    this.listItems.push(listItem);
    this.rootElement.appendChild(listItem.render())
  }

  removeEventFromList(eventId: string) {
    const item = this.listItems.find(i => i.getEvent().id === eventId);
    this.listItems = this.listItems.filter(i => i.getEvent().id !== eventId);
    item.remove();
  }
  sortItems() {
    if (getSort() === SORT_TYPE.NONE) {
      this.listItems.forEach(i => {
        this.rootElement.appendChild(i.rootElement);
      })
    }
    switch (getSort()) {
      case (SORT_TYPE.NONE):
        console.log('kek')
        return this.listItems.forEach(this.appendItem);
      case (SORT_TYPE.DATE_ASK):
        return [...this.listItems].sort(sortByDate(true)).forEach(this.appendItem);
      case (SORT_TYPE.DATE_DESC):
        return [...this.listItems].sort(sortByDate(false)).forEach(this.appendItem);
      case (SORT_TYPE.TYPE_ASK):
      case (SORT_TYPE.TYPE_DESC):
      default:
        return;
    }
  }
  appendItem(item: EventListItem) {
    this.rootElement.appendChild(item.rootElement);
  }

  render() {
    this.listItems = getEvents().map(event => new EventListItem({ event }));
    if (getEvents().length)
      return DOM.update(this.rootElement, {
        class: 'event-list',
        childrens: this.listItems.map(i => i.render())
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