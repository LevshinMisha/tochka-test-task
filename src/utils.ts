import { Component, AnyComponent } from "./components";

interface UpdateObj {
  classList?: any[],
  text?: string,
  class?: string,
  childrens?: HTMLElement[],
  onClick?: Function,
  id?: string
}

export const DOM = {
  create: (tagName: string, update?: UpdateObj) => {
    return DOM.update(document.createElement(tagName), update);
  },
  update: (element: HTMLElement, update?: UpdateObj) => {
    if (update) {
      if (update.classList) DOM.setClassList(element, update.classList);
      if (update.text) DOM.setText(element, update.text);
      if (update.class) DOM.setClassList(element, [update.class]);
      if (update.childrens) DOM.setChildrens(element, update.childrens);
      if (update.onClick) DOM.setOnClick(element, update.onClick)
      if (update.id) DOM.setId(element, update.id)
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
  },
  setHtml: (element: HTMLElement, html: string) => {
    element.innerHTML = html;
    return element;
  },
  setChildrens: (element: HTMLElement, childrens: HTMLElement[]) => {
    childrens.forEach(child => {
      if (child) element.appendChild(child)
    });
    return element;
  },
  setOnClick: (element: HTMLElement, onClick: Function) => {
    element.onclick = event => onClick(event);
    return element;
  },
  setId: (element: HTMLElement, id: string) => {
    return DOM.setAttr(element, 'id', id)
  },
  setAttr: (element: HTMLElement, attrName: string, value: string) => {
    element.setAttribute(attrName, value);
    return element;
  },
  addAttr: (element: HTMLElement, attrName: string, condition: boolean = true) => {
    if (condition)
      element.setAttribute(attrName, '');
    return element;
  },
  getAttr: (element: HTMLElement, attrName: string) => {
    return element.getAttribute(attrName);
  },
  hasAttr: (element: HTMLElement, attrName: string) => {
    return element.hasAttribute(attrName);
  },
  getTagName: (element: HTMLElement) => {
    return element.tagName;
  },
  getInputValue: (element: HTMLInputElement) => {
    return element.value;
  },
  setInputValue: (element: HTMLInputElement, value: string) => {
    element.value = value;
    return element;
  },
  div: (className: string, optionals?: UpdateObj) => {
    return DOM.create('div', { class: className, ...optionals });
  },
  span: (className: string, text: string, optionals?: UpdateObj) => {
    return DOM.create('span', { class: className, text, ...optionals });
  }
}