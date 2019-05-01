import { DOM } from "../../../../utils";
import { Component } from "../../..";

import './index.sss';
import { EVENT, EVENT_FIELD, EVENT_FIELD_TYPE_ENUM, CURRENCY_OPTIONS } from "../../../../const";
import CheckboxPlusMinus from "../../../common/checkbox-plus-minus";

interface Props {
  event: EVENT
}

interface State {}

class AddEventForm extends Component<Props, State> {
  fields: HTMLElement
  inputs: HTMLElement[] = []
  renderEventFieldInput(field: EVENT_FIELD) {
    const input = DOM.create('input');
    switch (field.type) {
      case EVENT_FIELD_TYPE_ENUM.NUMBER:
        input.setAttribute("type", "number");
        input.setAttribute('min', '0');
        this.inputs.push(input);
        return input;
      case EVENT_FIELD_TYPE_ENUM.DATE:
        input.setAttribute("type", "date");
        this.inputs.push(input);
        return input;
      case EVENT_FIELD_TYPE_ENUM.TEXTAREA:
        const textarea = DOM.create('textarea');
        this.inputs.push(textarea);
        return textarea;
      case EVENT_FIELD_TYPE_ENUM.CURRENCY:
        const childrens = CURRENCY_OPTIONS.map(text => {
          return DOM.create('option', { text })
        });
        const select = DOM.create('select', { childrens });
        this.inputs.push(select);
        return select;
      case EVENT_FIELD_TYPE_ENUM.PRIHOD:
        const plusMinus = new CheckboxPlusMinus({ plusText: 'приход', minusText: 'расход' }).render();
        const checkbox = plusMinus.children.item(0);
        this.inputs.push(checkbox);
        return plusMinus;
      default:
        this.inputs.push(input);
        return input;
    } 
  }
  
  render() {
    this.rootElement.className = 'add-event-form';
    this.inputs = [];
    const title = DOM.create('div', { class: 'add-event-form__title', text: this.props.event.name });
    this.fields = DOM.create('form', { class: 'add-event-form__fields'});
    this.props.event.fields.forEach(field => {
      const fieldTitle = DOM.create('div', { class: 'add-event-form__field-title', text: field.title });
      const fieldInput = this.renderEventFieldInput(field);
      const fieldElement = DOM.create('div', { class: 'add-event-form__field', childrens: [fieldTitle, fieldInput] });
      this.fields.appendChild(fieldElement);
    })
    return DOM.setChildrens(this.rootElement, [title, this.fields]);
  }
}

export default AddEventForm;