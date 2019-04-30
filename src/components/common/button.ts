import "./index.css"

interface ButtonProps {
  text: string;
  class?: string;
  onClick?: Function;
}

const Button = (props: ButtonProps) => {
  const button = document.createElement('button');
  button.innerText = props.text;
  button.classList.add('button');
  if (props.class)
    button.classList.add(props.class);
  if (props.onClick)
    button.onclick = () => props.onClick()
  return button;
}

export default Button;