import GreenButton from "./components/common/button/green";
import EventList from "./components/app/event-list";
import Modal from "./components/common/modal";
import AddEvent from "./components/app/modal/add-event";

import { DOM } from "./utils";

import { Component } from "./components";

//@ts-ignore
import StickerImage from './assets/sticker.png';
import './index.sss';
import { EVENTS } from "./const";
import ShowEventModal from "./components/app/modal/show-event";

const ESC_CHAR_CODE = 27;

class App extends Component<{}, {}> {
  addModal: Modal
  showModal: Modal

  componentDidMount() {
    new Image().src = StickerImage; // предзагрузка картинки
    document.onkeydown = event => {
      if (event.charCode === ESC_CHAR_CODE) { // закрытие модалок на esc
        this.addModal.close();
        this.showModal.close();
      }
    }
  }
  render() {
    this.showModal = ShowEventModal({ event: EVENTS.FINANCE})
    const eventList = new EventList({ openModal: this.showModal.open, eventForm: this.showModal.props.component });
    this.addModal = new Modal({ component: new AddEvent({ addEvent: eventList.addEvent }) });
    const button = new GreenButton({ text: "Добавить", onClick: this.addModal.open });

    return DOM.update(this.rootElement, {
      class: 'app',
      childrens: [
        eventList.render(),
        button.render(),
        this.addModal.render(),
        this.showModal.render()
      ]
    })
  }
}

export default App;