import { DOM } from "../../../../utils";
import { Component } from "../../..";

import "./index.sss"
import { STORED_EVENT, EVENTS, EVENT, EVENT_FIELD, EVENT_FIELD_TYPE_ENUM, BALANCE_TEXTS, MODAL_TYPE } from "../../../../const";
import { setShowEvent } from "../../../../store/showEvent";
import { openModal } from "../../../../store/modal";

interface Props {
  event: STORED_EVENT
}

class EventListItem extends Component<Props, {}> {
  getEvent() {
    return this.props.event;
  }
  renderValue(field: EVENT_FIELD, value: string) {
    switch (field.type) {
      case (EVENT_FIELD_TYPE_ENUM.BALANCE):
        return DOM.create('span', {
          classList: [
            'event-list-item__field-value', 
            `event-list-item__field-value--balance-${value}`
          ],
          text: value === 'true' ? BALANCE_TEXTS.PLUS : BALANCE_TEXTS.MINUS
        });
      default:
        return DOM.span('event-list-item__field-value', value);
    }
  }
  showEvent(event: STORED_EVENT) {
    setShowEvent(event);
    openModal(MODAL_TYPE.SHOW_EVENT);
  }
  render() {
    const event = Object.keys(EVENTS).map(key => EVENTS[key]).find(i => i.name === this.props.event.name);
    return DOM.update(this.rootElement, {
      id: this.props.event.id,
      class: 'event-list-item',
      onClick: () => this.showEvent(this.props.event),
      childrens: [
        DOM.span('event-list-item__title', this.props.event.name),
        DOM.div('event-list-item__bottom-block', {
          childrens: this.props.event.fields.map((value, i) => {
            if (event.fields[i].showInList) {
              return DOM.div('event-list-item__field-wrap', { childrens: [
                DOM.span('event-list-item__field-title', event.fields[i].title ),
                this.renderValue(event.fields[i], value)
              ]});
            }
            return null;
          })
        })
      ]
    });
  }
}

export default EventListItem;