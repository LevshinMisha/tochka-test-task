import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

interface Props {
  text: string;
  class? : string;
  onClick?: Function;
}

class Button extends Component<Props, {}> {
  constructor (props: Props, state?: any) {
    super(props, state, 'button')
  }
  render() {
    return DOM.update(this.rootElement, {
      classList: ['button', this.props.class],
      text: this.props.text,
      onClick: this.props.onClick && (() => this.props.onClick())
    });
  }
}

export default Button;