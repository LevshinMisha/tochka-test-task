import { DOM } from "../../../utils";
import { Component, AnyComponent } from "../..";

import "./index.sss"
import { EVENT, SORT_TYPE } from "../../../const";

interface TableProps {}

interface State {
  content: EVENT[];
  sortDate: SORT_TYPE,
  sortType: SORT_TYPE
}

class Table extends Component<TableProps, State> {
  constructor(props: TableProps) {
    super(props);
    this.state = {
      content: [],
      sortDate: SORT_TYPE.NONE,
      sortType: SORT_TYPE.NONE
    }
  }

  render() {
    DOM.setClassList(this.rootElement, ['table']);
    if (this.state.content.length)
      this.state.content.forEach((contentProp) => {

      });
    else {
      this.rootElement.appendChild(DOM.create('span', { text: 'Таблица сейчас пуста, нажмите кнопку ниже, чтобы добавить в нее что-нибудь.' }));
      this.rootElement.classList.add('table--empty');
    }
      
    return this.rootElement;
  }
}

export default Table;