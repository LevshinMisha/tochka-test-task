import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"
import { SORT_TYPE, STORED_EVENT } from "../../../const";
import EventListItem from "./event-list-item";

interface Props {}

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
  }

  addEvent(event: STORED_EVENT) {
    console.log(this)
    this.setState({
      events: [...this.state.events, event],
      sortDate: this.state.sortDate,
      sortType: this.state.sortType
    })
  }

  render() {
    if (this.state.events.length)
      this.state.events.forEach(event => {
        this.rootElement.appendChild(new EventListItem({ event }).render());
      });
    else {
      this.rootElement.appendChild(DOM.create('span', { text: 'Таблица сейчас пуста, нажмите кнопку ниже, чтобы добавить в нее что-нибудь.' }));
    }
      
    return DOM.setClassList(this.rootElement, ['event-list', !this.state.events.length && 'event-list--empty']);
  }
}

export default EventList;