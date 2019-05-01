import { DOM } from "../../../../utils";
import { Component } from "../../..";

import "./index.sss"
import { STORED_EVENT, EVENTS } from "../../../../const";

interface Props {
  event: STORED_EVENT
}

class EventListItem extends Component<Props, {}> {
  render() {
    const item = DOM.create('div', { class: 'event-list-item' });
    const event = Object.keys(EVENTS).map(key => EVENTS[key]).find(i => i.name === this.props.event.name);
    this.props.event.fields.forEach((field, i) => {
      if (event.fields[i].showInList) {
        const fieldWrap = DOM.create('div', { class: 'event-list-item__field-wrap' });
        const fieldTitle = DOM.create('div', { class: 'event-list-item__field-title', text: event.fields[i].title });
        const fieldValue = DOM.create('div', { class: 'event-list-item__field-value', text: field});
        item.appendChild(DOM.setChildrens(fieldWrap, [fieldTitle, fieldValue]));
      }
    })
    return item;
  }
}

export default EventListItem;