import GreenButton from "./components/common/button/green";
import EventList from "./components/app/event-list";
import Modal from "./components/common/modal";
import AddEventModal from "./components/app/modal/add-event";

import { DOM } from "./utils";

import { Component } from "./components";

//@ts-ignore
import StickerImage from './assets/sticker.png';
import './index.sss';
import { MODAL_TYPE } from "./const";
import ShowEventModal from "./components/app/modal/show-event";
import { openModal, closeModal } from "./store/modal";

const ESC_CHAR_CODE = 27;

class App extends Component<{}, {}> {
  componentDidMount() {
    new Image().src = StickerImage; // предзагрузка картинки
    document.onkeydown = event => {
      if (event.charCode === ESC_CHAR_CODE) closeModal() // закрытие модалок на esc
    }
  }
  render() {
    return DOM.div('app', {
      childrens: [
        new EventList({ }).render(),
        new GreenButton({ text: "Добавить", onClick: () => openModal(MODAL_TYPE.ADD_EVENT) }).render(),
        AddEventModal({}).render(),
        ShowEventModal({}).render(),
        DOM.div('image-hash', {
          childrens: [
            DOM.setAttr(DOM.create('img'), 'src', StickerImage)
          ]
        })
      ]
    })
  }
}

export default App;