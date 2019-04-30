import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

export interface ButtonProps {
  text: string;
  class? : string;
  onClick?: Function;
}

class Button extends Component<ButtonProps, {}> {
  render() {
    const button = DOM.create('button');
    DOM.setClassList(button, ['button', this.props.class]);
    DOM.setText(button, this.props.text);
    if (this.props.onClick) button.onclick = () => this.props.onClick();
    return button;
  }
}

export default Button;