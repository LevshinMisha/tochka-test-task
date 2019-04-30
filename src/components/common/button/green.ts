import Button, { ButtonProps } from ".";

export default class GreenButton extends Button {
  constructor(props: ButtonProps) {
    super({...props, class: "button--green"});
  }
}