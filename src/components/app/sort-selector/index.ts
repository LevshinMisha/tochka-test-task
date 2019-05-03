import { DOM } from "../../../utils";
import { Component } from "../..";

import "./index.sss"
import { setSort, getSort, subscribeOnSort } from "../../../store/sort";
import { SORT_TYPE } from "../../../const";

interface Props {
}

const createSortOption = (sortType: SORT_TYPE, text: string) => DOM.span('', text, {
  classList: ['sort-selector__option', getSort() === sortType && 'sort-selector__option--active'],
  onClick: () => setSort(sortType)
})

class SortSelector extends Component<Props, {}> {
  componentDidMount() {
    subscribeOnSort(() => this.reRender())
  }
  render() {
    return DOM.update(this.rootElement, { 
      class: 'sort-selector',
      childrens: [
        createSortOption(SORT_TYPE.NONE, 'Убрать сортировку'),
        createSortOption(SORT_TYPE.DATE_ASK, 'Дата по возрастанию'),
        createSortOption(SORT_TYPE.DATE_DESC, 'Дата по убыванию'),
        createSortOption(SORT_TYPE.TYPE_ASK, 'Тип во возрастанию'),
        createSortOption(SORT_TYPE.TYPE_DESC, 'Тип по убыванию')
      ]
    });
  }

}

export default SortSelector;