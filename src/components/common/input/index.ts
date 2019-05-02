import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

interface Props {
  textarea?: boolean;
  class? : string;
}

class Input extends Component<Props, {}> {
  constructor (props: Props, state?: any) {
    super(props, state, props.textarea ? 'textarea' : 'input')
  }
  componentDidMount() {
    this.rootElement.onchange = () => this.rootElement.classList.remove('input--error')
  }
  addError() {
    this.rootElement.classList.add('input--error')
  }
  render() {
    return DOM.update(this.rootElement, {
      classList: ['input', this.props.class]
    });
  }
}

export default Input;