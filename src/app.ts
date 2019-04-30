import GreenButton from "./components/common/button/green";
import Table from "./components/app/table/table";
import { DOM } from "./utils";
import './index.sss';

const App = () => {
  const app = DOM.create('div', { classList: ["app"] });

  const button = new GreenButton({ text: "Добавить", onClick: () => console.log('click') }).render();
  const table = new Table({}).render();

  app.appendChild(table);
  app.appendChild(button);

  return app;
}

export default App;