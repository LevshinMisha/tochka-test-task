import { DOM } from "../../../utils";
import { Component } from "../..";

import { EVENT, EVENT_FIELD, EVENT_FIELD_TYPE_ENUM, CURRENCY_OPTIONS, BALANCE_TEXTS, STORED_EVENT } from "../../../const";
import CheckboxGreenRed from "../../common/checkbox-green-red";

import './index.sss';

interface Props {
  event: EVENT,
  showEvent?: STORED_EVENT
}

class EventForm extends Component<Props, {}> {
  inputs: HTMLInputElement[] = []

  renderInput(field: EVENT_FIELD, inputs: HTMLElement[], value?: string) {
    const input = DOM.create(!value ? 'input' : 'div', { class: 'event-form__input' });
    if (value)
      DOM.setText(input, value);
    switch (field.type) {
      case EVENT_FIELD_TYPE_ENUM.BALANCE:
        const checkboxGreenRed = new CheckboxGreenRed({ 
          greenText: BALANCE_TEXTS.PLUS,
          redText: BALANCE_TEXTS.MINUS,
          checked: !value || value === 'true',
          disabled: !!value
        });
        const rendered = checkboxGreenRed.render();
        inputs.push(checkboxGreenRed.getCheckbox());
        return rendered;
      case EVENT_FIELD_TYPE_ENUM.TEXTAREA:
        if (!value) {
          const textarea = DOM.create('textarea', { classList: ['event-form__input', 'event-form__input--textarea']});
          if (value) DOM.setAttr(textarea, 'value', value);
          inputs.push(textarea);
          return textarea;
        }
        return DOM.span('', value, { classList: ['event-form__input', 'event-form__input--textarea']})
      case EVENT_FIELD_TYPE_ENUM.NUMBER:
        if (!value) {
          input.setAttribute("type", "number");
          input.setAttribute('min', '0');
          inputs.push(input);
          return input;
        }
      case EVENT_FIELD_TYPE_ENUM.DATE:
        if (!value) {
          input.setAttribute("type", "date");
          inputs.push(input);
          return input;
        }
      case EVENT_FIELD_TYPE_ENUM.CURRENCY:
        if (!value) {
          const childrens = CURRENCY_OPTIONS.map(text => {
            return DOM.create('option', { text })
          });
          const select = DOM.create('select', { childrens });
          inputs.push(select);
          return select;
        }
      default:
        if (value)
          input.classList.add('input')
        inputs.push(input);
        return input;
    }
  }

  clear() {
    this.inputs.forEach(i => {
      if (DOM.getTagName(i) === 'INPUT' || DOM.getTagName(i) === 'TEXTAREA')
        if (DOM.getAttr(i, 'type') === 'checkbox')
          (<HTMLInputElement>i).checked = true;
        else
          DOM.setInputValue(i, '')
      if (DOM.getTagName(i) === 'SELECT')
        DOM.setInputValue(i, i.children.item(0).innerHTML);
    })
  }

  render() {
    this.inputs = [];

    return DOM.update(this.rootElement, {
      class: 'event-form',
      childrens: [
        DOM.span('event-form__title', this.props.event.name),
        DOM.div('event-form__fields', {
          childrens: this.props.event.fields.map((field, i) => {
            return DOM.div('event-form__field', {
              childrens: [
                DOM.span('event-form__field-title', field.title),
                this.renderInput(field, this.inputs, this.props.showEvent && this.props.showEvent.fields[i])
              ]
            })
          })
        })
      ]
    })
  }
}

export default EventForm;