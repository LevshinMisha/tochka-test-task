import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

interface Props {
  greenText: string;
  redText: string;
  checked: boolean;
  disabled?: boolean;
}

class CheckboxGreenRed extends Component<Props, {}> {
  input: HTMLElement
  render() {
    this.input = DOM.create('input', { class: 'checkbox-green-red__checkbox'});
    DOM.setAttr(this.input, 'type', 'checkbox');
    DOM.addAttr(this.input, 'checked', this.props.checked);
    DOM.addAttr(this.input, 'disabled', this.props.disabled)
    return DOM.create('label', { 
      class: 'checkbox-green-red',
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