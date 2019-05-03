import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"
import { setSort, getSort, subscribeOnSort } from "../../../store/sort";
import { SORT_TYPE } from "../../../const";


const createSortOption = (sortType: SORT_TYPE, text: string) => DOM.span('', text, {
  classList: ['sort-selector__option', getSort() === sortType && 'sort-selector__option--active'],
  onClick: () => setSort(sortType)
});

const options = [
  { sortType: SORT_TYPE.NONE,       text: 'Убрать сортировку' },
  { sortType: SORT_TYPE.DATE_ASK,   text: 'Дата по возрастанию' },
  { sortType: SORT_TYPE.DATE_DESC,  text: 'Дата по убыванию' },
  { sortType: SORT_TYPE.TYPE_ASK,   text: 'Тип по возрастанию' },
  { sortType: SORT_TYPE.TYPE_DESC,  text: 'Тип по убыванию' },
]

class SortSelector extends Component<{}, {}> {
  componentDidMount() {
    subscribeOnSort(() => this.reRender())
  }
  render() {
    return DOM.update(this.rootElement, { 
      class: 'sort-selector',
      childrens: options.map(i => createSortOption(i.sortType, i.text))
    });
  }
  reRender() {
    options.forEach((option, i) => {
      if (option.sortType === getSort())
        this.rootElement.children.item(i).classList.add('sort-selector__option--active');
      else 
        this.rootElement.children.item(i).classList.remove('sort-selector__option--active');
    });
    return this.rootElement;
  }

}

export default SortSelector;