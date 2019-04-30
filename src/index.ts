import Button from "./components/common/button";

const app = document.getElementById("app");

const button = Button({ text: "kek", onClick: () => console.log('click')})

app.appendChild(button);