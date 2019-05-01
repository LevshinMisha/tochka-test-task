import { Component, AnyComponent } from "../..";
import { DOM } from "../../../utils";

import "./index.sss";


interface Props {
  component: AnyComponent,
}

interface State {
  open: boolean
}

class Modal extends Component<Props, State> {
  state = { open: false }
  componentDidMount() {
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.rootElement.onclick = this.close;
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
      childrens: [
        DOM.div('modal__content-wrap', {
          onClick: (event: Event) => event.stopPropagation(),
          childrens: [this.props.component.render()],
        })
      ],
    });
  }
  reRender() {
    return DOM.setClassList(this.rootElement, ['modal', this.state.open && 'modal--open']);;
  }
}

export default Modal;