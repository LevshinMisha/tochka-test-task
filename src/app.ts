import GreenButton from "./components/common/button/green";
import EventList from "./components/app/event-list";
import Modal from "./components/common/modal";
import AddEvent from "./components/app/add-event";

import { DOM } from "./utils";

import { Component } from "./components";

//@ts-ignore
import StickerImage from './assets/sticker.png';
import './index.sss';

class App extends Component<{}, {}> {
  componentDidMount() {
    new Image().src = StickerImage; // предзагрузка картинки
  }
  render() {
    const eventList = new EventList({});
    const addModal = new Modal({ component: new AddEvent({ addEvent: eventList.addEvent }) });
    const button = new GreenButton({ text: "Добавить", onClick: addModal.open });
    return DOM.update(this.rootElement, {
      class: 'app',
      childrens: [
        eventList.render(),
        button.render(),
        addModal.render()
      ]
    })
  }
}

export default App;