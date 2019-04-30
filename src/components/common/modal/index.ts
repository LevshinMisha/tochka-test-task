import { Component, AnyComponent } from "../..";
import { DOM } from "../../../utils";

import "./index.sss";


export interface Props {
  component: AnyComponent,
}

export interface State {
  open: boolean
}

class Modal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      open: false
    };
  }
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
    const contentWrap = DOM.create('div', { class: 'modal__content-wrap', childrens: [this.props.component.render()] });
    contentWrap.onclick = event => event.preventDefault();
    return DOM.setChildrens(this.rootElement, [contentWrap]);
  }
}

export default Modal;