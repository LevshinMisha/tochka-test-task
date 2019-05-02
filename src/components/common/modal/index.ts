import { Component, AnyComponent } from "../..";
import { DOM } from "../../../utils";

import "./index.sss";


export interface ModalProps {
  component: AnyComponent,
  stickerBackground?: boolean
}

interface State {
  open: boolean
}

class Modal extends Component<ModalProps, State> {
  state = { open: false }
  componentDidMount() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }
  open() {
    this.setState({ open: true });
  }
  close () {
    this.setState({ open: false });
  }
  render() {
    this.props.component.props = { ...this.props.component.props, closeModal: this.close };
    return DOM.update(this.rootElement, {
      classList: ['modal', this.state.open && 'modal--open'],
      onClick: () => this.close(),
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
    return DOM.setClassList(this.rootElement, ['modal', this.state.open && 'modal--open']);
  }
}

export default Modal;