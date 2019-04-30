import GreenButton from "./components/common/button/green";
import Table from "./components/app/table/table";
import Modal from "./components/common/modal";
import AddEvent from "./components/app/addEvent";

import { DOM } from "./utils";

import './index.sss';

const App = () => {
  const app = DOM.create('div', { classList: ["app"] });

  const addEvent = new AddEvent({});
  
  const table = new Table({});
  
  const addModal = new Modal({ component: addEvent });
  const button = new GreenButton({ text: "Добавить", onClick: addModal.open });

  app.appendChild(table.render());
  app.appendChild(button.render());
  app.appendChild(addModal.render())


  return app;
}

export default App;