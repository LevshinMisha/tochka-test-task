import { DOM } from "../../../utils";
import { Component } from "../..";

import './index.sss';
import { EVENTS } from "../../../const";

export interface Props {
  class? : string;
  onClick?: Function;
}

class AddEvent extends Component<Props, {}> {
  render() {
    const eventTypes = DOM.create('div', { class: 'add-event-modal__event-types' });
    const eventForm = DOM.create('div');
    Object.keys(EVENTS).forEach(key => {
      const event = EVENTS[key];
      const tab = DOM.create('div', { class: 'add-event-modal__event-type', text: event.name });
      tab.onclick = () => {
        
      }
      eventTypes.appendChild(tab);
    })


    const modalContent = DOM.create('div', { class: 'add-event-modal', childrens: [eventTypes, eventForm]});

    return modalContent;
  }
}

export default AddEvent;