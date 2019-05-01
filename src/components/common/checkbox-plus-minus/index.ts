import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"

export interface ButtonProps {
  plusText: string;
  minusText : string;
}

class CheckboxPlusMinus extends Component<ButtonProps, {}> {
  input: HTMLElement
  render() {
    this.input = DOM.create('input', { class: 'checkbox-plus-minus__checkbox'});
    this.input.setAttribute('type', 'checkbox');
    const plus = DOM.create('span', { class: 'checkbox-plus-minus__plus', text: `+${this.props.plusText}` });
    const minus = DOM.create('span', { class: 'checkbox-plus-minus__minus', text: `-${this.props.minusText}` });
    return DOM.create('label', { class: 'checkbox-plus-minus', childrens: [ this.input, plus, minus ]});
  }
}

export default CheckboxPlusMinus;