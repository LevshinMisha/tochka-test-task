interface CreateOptionals {
  classList?: any[],
  text?: string
}

export const DOM = {
  create: (tagName: string, optionals?: CreateOptionals) => {
    const element = document.createElement(tagName);
    if (optionals) {
      if (optionals.classList) DOM.setClassList(element, optionals.classList);
      if (optionals.text) DOM.setText(element, optionals.text);
    }
    return element;
  },
  setClassList: (element: HTMLElement, newClassList: any[]) => {
    element.className = '';
    newClassList.forEach(className => {
      if (typeof className === 'string')
        element.classList.add(className);
    });
    return element;
  },
  setText: (element: HTMLElement, text: string) => {
    element.innerText = text;
    return element;
  }
}