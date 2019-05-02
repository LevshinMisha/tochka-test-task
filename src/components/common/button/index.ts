import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

export interface ButtonProps {
  text: string;
  class? : string;
  onClick?: Function;
}

class Button extends Component<ButtonProps, {}> {
  constructor (props: ButtonProps, state?: any) {
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