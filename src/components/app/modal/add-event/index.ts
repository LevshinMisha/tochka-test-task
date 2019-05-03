
//@ts-ignore
import uuid4 from 'uuid4';

import { DOM } from "../../../../utils";
import { Component } from "../../..";

import './index.sss';
import { EVENTS, EVENT, MODAL_TYPE } from "../../../../const";
import EventForm from "../../event-form";
import GreenButton from "../../../common/button/green";
import { addEvent } from '../../../../store/events';
import { closeModal } from '../../../../store/modal';
import Modal from '../../../common/modal';

interface Props {}

interface State {
  event: EVENT
}

class AddEventModalContent extends Component<Props, State> {
  eventTabs: HTMLElement
  eventForm: EventForm

  constructor(props: Props) {
    super(props, { event: EVENTS.FINANCE })
  }

  buttonOnClick() {
    const values = this.eventForm.inputs.map(i => DOM.getAttr(i ,'type') !== 'checkbox' && DOM.getAttr(i ,'type') !== 'radio' ? i.value : (<HTMLInputElement>i).checked);
    let isInputsValid = true;
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      const field = this.state.event.fields[i];
      if (field.mask)
        if(!field.mask.regexp.test(value.toString())) {
          alert(field.mask.errorMessage);
          isInputsValid = false;
          this.eventForm.inputs[i].classList.add('event-form__input--error')
        }
    }
    if (isInputsValid)
      if (values.every(value => typeof value !== 'string' || !!value.length)) {
        closeModal();
        addEvent({
          id: uuid4(),
          name: this.state.event.name,
          fields: values.map(i => i.toString())
        });
        this.eventForm.clear();
      } else {
        alert('Не все поля заполнены');
        values.forEach((value, i) => {
          if (typeof value === 'string' && !value.length) {
            this.eventForm.inputs[i].classList.add('event-form__input--error')
          } 
        })
      }
        
  }
  
  render() {
    this.eventTabs = DOM.div('add-event-modal__event-tabs', {
      childrens: Object.keys(EVENTS).map(key => EVENTS[key]).map(event => {
        return DOM.span('', event.name, {
          classList: ['add-event-modal__event-tab', this.state.event === event && 'add-event-modal__event-tab--active'],
          onClick: () => this.setState({ event })
        })
      })
    })
    this.eventForm = new EventForm({ event: this.state.event });
    return DOM.update(this.rootElement, {
      class: 'add-event-modal',
      childrens: [
        DOM.div('add-event-modal__content-wrap', {
          childrens: [
            this.eventTabs,
            this.eventForm.render()
          ]
        }),
        new GreenButton({ class: 'add-event-modal__button', text: "Добавить", onClick: () => this.buttonOnClick()}).render()
      ]
    });
  }

  reRender() {
    Object.keys(EVENTS).forEach((key, i) => {
      const tab = this.eventTabs.children.item(i);
      if (this.state.event === EVENTS[key]) tab.classList.add('add-event-modal__event-tab--active')
      else tab.classList.remove('add-event-modal__event-tab--active')
    })
    this.eventForm.replaceProps({ event: this.state.event })
    return this.rootElement;
  }
}

function AddEventModal(props: Props) {
  return new Modal({
    component: new AddEventModalContent(props),
    modalType: MODAL_TYPE.ADD_EVENT
  })
}

export default AddEventModal;