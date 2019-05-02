import { DOM } from "../../../../utils";
import { Component } from "../../..";

import "./index.sss"
import EventForm from "../../event-form";
import { EVENT, STORED_EVENT } from "../../../../const";
import Modal from "../../../common/modal";
import RedButton from "../../../common/button/red";

interface Props {
  event: EVENT,
  showEvent?: STORED_EVENT
}

class ShowEventModalContent extends Component<Props, {}> {
  eventForm: EventForm
  changeEvent(event: STORED_EVENT) {
    this.eventForm.props.showEvent
  }
  deleteEvent(event: STORED_EVENT) {
    
  }
  render() {
    this.eventForm = new EventForm(this.props)
    return DOM.update(this.rootElement, {
      class: 'show-event-modal',
      childrens: [ 
        this.eventForm.render(),
        new RedButton({ text: 'Удалить' }).render()
      ]
    });
  }
}

function ShowEventModal(props: Props) {
  return new Modal({
    component: new ShowEventModalContent(props),
    stickerBackground: true
  })
}

export default ShowEventModal;