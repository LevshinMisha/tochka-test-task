import { DOM } from "../../../../utils";

import './index.sss';
import { EVENT, EVENT_FIELD } from "../../../../const";
import EventForm from "..";

interface Props {
  event: EVENT
}

class AddEventForm extends EventForm {  
  render() {
    this.inputs = [];

    return DOM.update(this.rootElement, {
      class: 'add-event-form',
      childrens: [
        DOM.span('add-event-form__title', this.props.event.name),
        DOM.div('add-event-form__fields', {
          childrens: this.props.event.fields.map((field: EVENT_FIELD) => {
            return DOM.div('add-event-form__field', {
              childrens: [
                DOM.span('add-event-form__field-title', field.title),
                this.renderInput(field, this.inputs)
              ]
            })
          })
        })
      ]
    })
  }
}

export default AddEventForm;