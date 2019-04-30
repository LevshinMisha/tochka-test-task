import { DOM } from "../../../utils";
import { Component, AnyComponent } from "../..";

import "./index.sss"

interface TableProps {
  tableContent?: AnyComponent[];
  class?: string;
}

class Table extends Component<TableProps, {}> {
  constructor(props: TableProps) {
    super(props);
  }
  
  render() {
    DOM.setClassList(this.rootElement, ['table', this.props.class]);
    if (this.props.tableContent)
      this.props.tableContent.forEach((child: AnyComponent) => {
        this.rootElement.appendChild(child.render())
      });
    else {
      this.rootElement.appendChild(DOM.create('span', { text: 'Таблица сейчас пуста, нажмите кнопку ниже, чтобы добавить в нее что-нибудь.' }));
      this.rootElement.classList.add('table--empty');
    }
      
    return this.rootElement;
  }
}

export default Table;