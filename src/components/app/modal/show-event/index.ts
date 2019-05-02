import { DOM } from "../../../../utils";
import { Component } from "../../..";

import "./index.sss"
import EventForm from "../../event-form";
import { MODAL_TYPE, EVENTS } from "../../../../const";
import Modal from "../../../common/modal";
import RedButton from "../../../common/button/red";
import { getShowEvent, subscribeOnShowEvent } from "../../../../store/showEvent";
import { deleteEvent } from "../../../../store/events";
import { closeModal } from "../../../../store/modal";

interface Props {}

class ShowEventModalContent extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    subscribeOnShowEvent(() => this.reRender());
    this.deleteEvent = this.deleteEvent.bind(this);
  }
  deleteEvent() {
    const event = getShowEvent();
    if (event) {
      deleteEvent(event.id);
      closeModal();
    }
  }
  render() {
    if (!getShowEvent())
      return this.rootElement;
    return DOM.update(this.rootElement, {
      class: 'show-event-modal',
      childrens: [ 
        new EventForm({ 
          event: Object.keys(EVENTS).map(key => EVENTS[key]).find(i => i.name === getShowEvent().name),
          showEvent: getShowEvent()
        }).render(),
        new RedButton({ text: 'Удалить', onClick: this.deleteEvent }).render()
      ]
    });
  }
}

function ShowEventModal(props: Props) {
  return new Modal({
    component: new ShowEventModalContent(props),
    stickerBackground: true,
    modalType: MODAL_TYPE.SHOW_EVENT
  })
}

export default ShowEventModal;