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
    DOM.setClassList(this.rootElement, ['modal', this.state.open && 'modal--open']);
    this.props.component.props = { ...this.props.component.props, closeModal: this.close };
    const contentWrap = DOM.create('div', { class: 'modal__content-wrap', childrens: [this.props.component.rootElement] });
    contentWrap.onclick = event => event.stopPropagation();
    return DOM.setChildrens(this.rootElement, [contentWrap]);
  }
  reRender() {
    return DOM.setClassList(this.rootElement, ['modal', this.state.open && 'modal--open']);;
  }
}

export default Modal;