import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"
import { SORT_TYPE } from "../../../const";
import EventListItem from "./event-list-item";
import { getEvents, subscribeOnEvents } from "../../../store/events";

interface Props {}

interface State {
  sortDate: SORT_TYPE,
  sortType: SORT_TYPE
}

class EventList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sortDate: SORT_TYPE.NONE,
      sortType: SORT_TYPE.NONE
    }
    subscribeOnEvents(() => this.reRender());
  }

  render() {
    if (getEvents().length)
      return DOM.update(this.rootElement, {
        class: 'event-list',
        childrens: getEvents().map(event => new EventListItem({ event }).render())
      })
    return DOM.update(this.rootElement, {
      classList: ['event-list', 'event-list--empty'],
      childrens: [
        DOM.span('event-list__empty-message', 'Таблица сейчас пуста, нажмите кнопку ниже, чтобы добавить в нее что-нибудь.')
      ]
    });
  }
}

export default EventList;