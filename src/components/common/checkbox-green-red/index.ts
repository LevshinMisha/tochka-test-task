import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

interface Props {
  greenText: string;
  redText: string;
  checked: boolean;
  disabled?: boolean;
  radio?: boolean;
}

class CheckboxGreenRed extends Component<Props, {}> {
  input: HTMLElement
  render() {
    this.input = DOM.create('input', { class: 'checkbox-green-red__checkbox'});
    DOM.setAttr(this.input, 'type', this.props.radio ? 'radio' : 'checkbox');
    if (this.props.checked)
      (<HTMLInputElement>this.input).checked = true;
    if (this.props.disabled)
      DOM.addAttr(this.input, 'disabled')
    return DOM.create('label', { 
      classList: ['checkbox-green-red', this.props.disabled && 'checkbox-green-red--disabled'],
      childrens: [
        this.input,
        DOM.span('checkbox-green-red__green', this.props.greenText),
        DOM.span('checkbox-green-red__red', this.props.redText)
      ]
    });
  }

  getCheckbox() {
    return this.input;
  }
}

export default CheckboxGreenRed;