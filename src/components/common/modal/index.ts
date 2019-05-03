import { Component, AnyComponent } from "../..";
import { DOM } from "../../../utils";

import "./index.sss";
import { subscribeOnModal, closeModal, isModalOpen } from "../../../store/modal";
import { MODAL_TYPE } from "../../../const";


export interface ModalProps {
  component: AnyComponent,
  modalType: MODAL_TYPE
  stickerBackground?: boolean
}

class Modal extends Component<ModalProps, {}> {
  constructor(props: ModalProps) {
    super(props);
    subscribeOnModal(() => this.reRender())
  }
  render() {
    return DOM.update(this.rootElement, {
      classList: ['modal', isModalOpen(this.props.modalType) && 'modal--open'],
      onClick: () => closeModal(),
      childrens: [
        DOM.div('', {
          classList: [
            'modal__content-wrap',
            this.props.stickerBackground && 'modal__content-wrap--sticker'
          ],
          onClick: (event: Event) => event.stopPropagation(),
          childrens: [this.props.component.render()],
        })
      ],
    });
  }
  reRender() {
    return DOM.setClassList(this.rootElement, ['modal', isModalOpen(this.props.modalType) && 'modal--open']);
  }
}

export default Modal;