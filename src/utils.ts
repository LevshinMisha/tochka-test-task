import { Component } from "./components";

interface CreateOptionals {
  classList?: any[],
  text?: string,
  class?: string,
  childrens?: HTMLElement[]
}

export const DOM = {
  create: (tagName: string, optionals?: CreateOptionals) => {
    const element = document.createElement(tagName);
    if (optionals) {
      if (optionals.classList) DOM.setClassList(element, optionals.classList);
      if (optionals.text) DOM.setText(element, optionals.text);
      if (optionals.class) DOM.setClassList(element, [optionals.class]);
      if (optionals.childrens) DOM.setChildrens(element, optionals.childrens);
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
    childrens.forEach(child => element.appendChild(child));
    return element;
  }
}