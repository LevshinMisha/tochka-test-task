import { DOM } from "../../../../utils";
import { Component } from "../../..";

import "./index.sss"
import EventForm from "../../event-form";
import { STORED_EVENT, MODAL_TYPE, EVENTS } from "../../../../const";
import Modal from "../../../common/modal";
import RedButton from "../../../common/button/red";
import { getShowEvent, subscribeOnShowEvent } from "../../../../store/showEvent";

interface Props {
  showEvent?: STORED_EVENT
}

class ShowEventModalContent extends Component<Props, {}> {
  constructor(props: Props) {
    super(props)
    subscribeOnShowEvent(() => this.reRender())
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
        new RedButton({ text: 'Удалить' }).render()
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