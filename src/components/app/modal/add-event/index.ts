
//@ts-ignore
import uuid4 from 'uuid4';

import { DOM } from "../../../../utils";
import { Component } from "../../..";

import './index.sss';
import { EVENTS, EVENT } from "../../../../const";
import EventForm from "../../event-form";
import GreenButton from "../../../common/button/green";

interface Props {
  addEvent: Function,
  closeModal?: Function;
}

interface State {
  event: EVENT
}

class AddEvent extends Component<Props, State> {
  eventTabs: HTMLElement
  eventForm: EventForm

  constructor(props: Props) {
    super(props, { event: EVENTS.FINANCE })
  }

  buttonOnClick() {
    const values = this.eventForm.inputs.map(i => DOM.getAttr(i ,'type') !== 'checkbox' ? i.value : (<HTMLInputElement>i).checked);
    if (values.every(value => typeof value !== 'string' || !!value.length)) {
      this.props.closeModal();
      this.props.addEvent({
        id: uuid4(),
        name: this.state.event.name,
        fields: values.map(i => i.toString())
      });
      this.eventForm.clear();
    } else
      alert('Не все поля заполнены')
  }
  
  render() {
    this.eventTabs = DOM.div('add-event__event-tabs', {
      childrens: Object.keys(EVENTS).map(key => EVENTS[key]).map(event => {
        return DOM.span('', event.name, {
          classList: ['add-event__event-tab', this.state.event === event && 'add-event__event-tab--active'],
          onClick: () => this.setState({ event })
        })
      })
    })
    this.eventForm = new EventForm({ event: this.state.event });
    return DOM.update(this.rootElement, {
      class: 'add-event',
      childrens: [
        DOM.div('add-event__content-wrap', {
          childrens: [
            this.eventTabs,
            this.eventForm.render()
          ]
        }),
        new GreenButton({ text: "Добавить", onClick: () => this.buttonOnClick()}).render()
      ]
    });
  }

  reRender() {
    Object.keys(EVENTS).forEach((key, i) => {
      const tab = this.eventTabs.children.item(i);
      if (this.state.event === EVENTS[key]) tab.classList.add('add-event__event-tab--active')
      else tab.classList.remove('add-event__event-tab--active')
    })
    this.eventForm.props = { event: this.state.event };
    this.eventForm.reRender();
    return this.rootElement;
  }
}

export default AddEvent;