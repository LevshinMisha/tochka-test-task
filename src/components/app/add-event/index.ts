import { DOM } from "../../../utils";
import { Component, AnyComponent } from "../..";

import './index.sss';
import { EVENTS, EVENT } from "../../../const";
import AddEventForm from "./add-event-form";
import GreenButton from "../../common/button/green";

interface Props {
  addEvent: Function,
  closeModal?: Function;
}

interface State {
  event: EVENT
}

class AddEvent extends Component<Props, State> {
  eventTypes: HTMLElement
  contentWrap: HTMLElement
  eventForm: AnyComponent
  addEventButton: HTMLElement

  constructor(props: Props) {
    console.log(props)
    super(props, { event: EVENTS.FINANCE })
  }
  
  componentDidMount() {
    this.eventTypes = DOM.create('div', { class: 'add-event-modal__event-types' });
    this.eventForm = new AddEventForm({ event: this.state.event })
    this.contentWrap = DOM.create('div', { class: 'add-event-modal__content-wrap' });
    DOM.setChildrens(this.contentWrap, [this.eventTypes, this.eventForm.render()])
    this.addEventButton = new GreenButton({ text: "Добавить", onClick: () => this.buttonOnClick()}).render();
    this.render();
    Object.keys(EVENTS).forEach(key => {
      const event = EVENTS[key];
      const tab = DOM.create('div', { class: 'add-event-modal__event-type', text: event.name });
      if (this.state.event === event) tab.classList.add('add-event-modal__event-type--active')
      tab.onclick = () => this.setState({ event })
      this.eventTypes.appendChild(tab);
    });
  }

  buttonOnClick() {
    const values = this.eventForm.inputs.map(i => i.type !== 'checkbox' ? i.value : i.checked);
    console.log(values, this.eventForm.inputs)
    if (values.every(value => typeof value !== 'string' || value.length)) {
      this.props.closeModal();
      this.props.addEvent({
        name: this.state.event.name,
        fields: values
      });
    } else {
      alert('Не все поля заполнены')
    }
  }
  
  render() {
    this.rootElement.className = 'add-event-modal';
    return DOM.setChildrens(this.rootElement, [this.contentWrap, this.addEventButton]);
  }

  reRender() {
    Object.keys(EVENTS).forEach((key, i) => {
      const tab = this.eventTypes.children.item(i);
      if (this.state.event === EVENTS[key]) tab.classList.add('add-event-modal__event-type--active')
      else tab.classList.remove('add-event-modal__event-type--active')
    })
    this.eventForm.props = { event: this.state.event };
    this.eventForm.reRender();
    return this.rootElement;
  }
}

export default AddEvent;