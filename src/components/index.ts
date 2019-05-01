import { DOM } from "../utils";

export abstract class Component<Props, State> {
  rootElement: HTMLElement
  props: Props
  state: State
  constructor(props: Props, state?: State) {
    this.props = props;
    if (state) this.state = state;
    this.rootElement = DOM.create('div');
    this.componentDidMount();
  }
  componentDidMount() {

  }
  abstract render(): HTMLElement
  setState(newState: any): void {
    this.state = {
      ...this.state,
      ...newState
    }
    this.reRender();
  }
  reRender(): HTMLElement {
    DOM.setClassList(this.rootElement, []);
    DOM.setHtml(this.rootElement, '');
    return this.render();
  }
  remove(): void {
    this.rootElement.remove();
  } 
}

export interface AnyComponent extends Component<any, any> {}