import "./index.sss"
import { DOM } from "../../../utils";
import { ClassPureComponent } from "../..";

export interface ButtonProps {
  text: string;
  class? : string;
  onClick?: Function;
}

class ButtonClass extends ClassPureComponent {
  constructor (props: ButtonProps) {
    super(props);
  }
  render() {
    const button = DOM.create('button');
    DOM.setClassList(button, ['button', this.props.class]);
    DOM.setText(button, this.props.text);
    if (this.props.onClick) button.onclick = () => this.props.onClick();
    return button;
  }
}

export default ButtonClass;