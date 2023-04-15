import './style.css';

const content = document.querySelector(".todos");
const add = document.querySelector("button.add");

function newTodo(){
    const toDo = document.createElement("div");
    toDo.classList.add("toDocard");
    toDo.textContent = "i'm here";
    content.appendChild(toDo);
}


add.addEventListener("click", newTodo);