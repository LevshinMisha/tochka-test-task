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
  render() {
    console.log(123, 'kek')
    return DOM.update(this.rootElement, {
      class: 'show-event-modal',
      childrens: [ 
        new EventForm(this.props).render(),
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