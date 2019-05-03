import Button, { ButtonProps } from ".";

export default class RedButton extends Button {
  constructor(props: ButtonProps) {
    super({...props, class: "button--red"});
  }
}