import { DOM } from "../../../utils";
import { Component } from "../..";

import { EVENT, EVENT_FIELD, EVENT_FIELD_TYPE_ENUM, CURRENCY_OPTIONS, BALANCE_TEXTS, STORED_EVENT, READ_TEXTS } from "../../../const";
import CheckboxGreenRed from "../../common/checkbox-green-red";

import './index.sss';
import { subscribeOnShowEvent, getShowEvent, setShowEvent } from "../../../store/showEvent";
import { setEvent } from "../../../store/events";

interface Props {
  event: EVENT,
  showEvent?: STORED_EVENT
}

class EventForm extends Component<Props, {}> {
  inputs: HTMLInputElement[] = []

  constructor(props: Props) {
    super(props)
    if (props.showEvent)
      subscribeOnShowEvent(() => {
        this.reRender()
      });
  }

  renderInput(field: EVENT_FIELD, inputs: HTMLElement[], value?: string) {
    const input = DOM.create(!value ? 'input' : 'div', { class: 'event-form__input' });
    if (value)
      DOM.setText(input, value);
    else 
      input.oninput = () => input.classList.remove('event-form__input--error')
    switch (field.type) {
      case EVENT_FIELD_TYPE_ENUM.BALANCE:
        const balanceCheckbox = new CheckboxGreenRed({ 
          greenText: BALANCE_TEXTS.PLUS,
          redText: BALANCE_TEXTS.MINUS,
          checked: !value || value === 'true',
          disabled: !!value
        });
        const renderedBalance = balanceCheckbox.render();
        inputs.push(balanceCheckbox.getCheckbox());
        return renderedBalance;
      case EVENT_FIELD_TYPE_ENUM.READ:
        const readCheckbox = new CheckboxGreenRed({ 
          greenText: READ_TEXTS.READ,
          redText: READ_TEXTS.NOT_READ,
          checked: value === 'true',
          radio: true
        });
        const renderedRead = readCheckbox.render();
        const checboxRead = readCheckbox.getCheckbox();
        const readIndex = this.inputs.length + 1;
        checboxRead.onchange = () => setEvent({
          ...this.props.showEvent,
          fields: this.props.showEvent.fields.map((e, i) => i === readIndex ? 'true' : e)
        })
        inputs.push(checboxRead);
        return renderedRead;
      case EVENT_FIELD_TYPE_ENUM.TEXTAREA:
        if (!value) {
          const textarea = DOM.create('textarea', { classList: ['event-form__input', 'event-form__input--textarea']});
          textarea.oninput = () => textarea.classList.remove('event-form__input--error')
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
          const select = DOM.create('select', { 
            childrens: CURRENCY_OPTIONS.map(text => DOM.create('option', { text }))
          });
          inputs.push(select);
          return select;
        }
      default:
        inputs.push(input);
        return input;
    }
  }

  clear() {
    this.inputs.forEach(i => {
      if (DOM.getTagName(i) === 'INPUT' || DOM.getTagName(i) === 'TEXTAREA')
        if (DOM.getAttr(i, 'type') === 'checkbox')
          (<HTMLInputElement>i).checked = true;
        else if (DOM.getAttr(i, 'type') === 'radio')
          (<HTMLInputElement>i).checked = false;
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
            return DOM.div('', {
              classList: [
                'event-form__field',
                field.hideOnCreate && !this.props.showEvent && 'event-form__field--hidden'
              ],
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