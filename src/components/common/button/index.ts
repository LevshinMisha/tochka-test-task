import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

export interface ButtonProps {
  text: string;
  class? : string;
  classList?: string[]
  onClick?: Function;
}

class Button extends Component<ButtonProps, {}> {
  constructor (props: ButtonProps, state?: any) {
    super(props, state, 'button')
  }
  render() {
    const classList = this.props.class ? [this.props.class] : this.props.classList ? this.props.classList : [];
    return DOM.update(this.rootElement, {
      classList: ['button', ...classList],
      text: this.props.text,
      onClick: this.props.onClick && (() => this.props.onClick())
    });
  }
}

export default Button;