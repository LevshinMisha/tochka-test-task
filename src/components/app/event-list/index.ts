import { DOM } from "../../../utils";
import { Component, AnyComponent } from "../..";

import "./index.sss"
import { SORT_TYPE, STORED_EVENT, EVENT } from "../../../const";
import EventListItem from "./event-list-item";

interface Props {
  openModal: Function,
  eventForm: AnyComponent
}

interface State {
  events: STORED_EVENT[];
  sortDate: SORT_TYPE,
  sortType: SORT_TYPE
}

class EventList extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      events: [],
      sortDate: SORT_TYPE.NONE,
      sortType: SORT_TYPE.NONE
    }
    this.addEvent = this.addEvent.bind(this);
    this.showEvent = this.showEvent.bind(this);
  }

  addEvent(event: STORED_EVENT) {
    this.setState({
      events: [...this.state.events, event],
      sortDate: this.state.sortDate,
      sortType: this.state.sortType
    })
  }

  showEvent(event: EVENT, showEvent: STORED_EVENT) {
    this.props.eventForm.props = { event, showEvent }
    this.props.eventForm.reRender();
    this.props.openModal();
  }

  render() {
    if (this.state.events.length)
      return DOM.update(this.rootElement, {
        class: 'event-list',
        childrens: this.state.events.map(event => new EventListItem({ event, showEvent: this.showEvent }).render())
      })
    return DOM.update(this.rootElement, {
      classList: ['event-list', !this.state.events.length && 'event-list--empty'],
      childrens: [
        DOM.span('event-list__empty-message', 'Таблица сейчас пуста, нажмите кнопку ниже, чтобы добавить в нее что-нибудь.')
      ]
    });
  }
}

export default EventList;