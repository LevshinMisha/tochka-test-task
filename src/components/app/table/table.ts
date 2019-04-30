import "./index.sss"
import { DOM } from "../../../utils";
import { ClassComponent, ClassPureComponent } from "../..";

interface TableProps {
  childrens?: ClassPureComponent[];
  class?: string;
}

class Table extends ClassComponent {
  constructor(props: TableProps) {
    super(DOM.create('div'), props);
  }
  
  render() {
    DOM.setClassList(this.rootElement, ['table', this.props.class]);
    if (this.props.childrens)
      this.props.childrens.forEach((child: ClassPureComponent) => {
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