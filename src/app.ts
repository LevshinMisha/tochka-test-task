import GreenButton from "./components/common/button/green";
import EventList from "./components/app/event-list";
import Modal from "./components/common/modal";
import AddEvent from "./components/app/addEvent";

import { DOM } from "./utils";

import './index.sss';

const App = () => {
  const app = DOM.create('div', { classList: ["app"] });
  
  const eventList = new EventList({});

  const addEvent = new AddEvent({ addEvent: eventList.addEvent });
  
  const addModal = new Modal({ component: addEvent });
  const button = new GreenButton({ text: "Добавить", onClick: addModal.open });

  app.appendChild(eventList.render());
  app.appendChild(button.render());
  app.appendChild(addModal.render());

  return app;
}

export default App;