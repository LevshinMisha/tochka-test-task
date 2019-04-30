export interface PureComponent {
  render(props: any): HTMLElement
}

export interface Component extends PureComponent {
  reRender(props: any): HTMLElement,
}

export abstract class ClassPureComponent {
  props: any
  constructor(props: any) {
    this.props = props;
  }
  abstract render(): HTMLElement
}

export abstract class ClassComponent extends ClassPureComponent{
  rootElement: HTMLElement
  constructor(rootElement: HTMLElement, props: any) {
    super(props);
    this.rootElement = rootElement;
  }
  reRender(): HTMLElement {
    this.rootElement.innerHTML = '';
    this.render();
    return this.rootElement;
  }
}