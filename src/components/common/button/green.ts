import Button, { ButtonProps } from ".";

export default class GreenButton extends Button {
  constructor(props: ButtonProps) {
    const { class: string, ...otherProps } = props;
    super({...otherProps, classList: ['button--green', props.class]});
  }
}