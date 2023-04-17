import { ToDoCard } from "./classes";

const addCard = document.querySelector("button.addCard");
const content = document.querySelector(".todos");


function formTitle(){
    const titleinput = document.createElement("input");
    titleinput.type = "text";
    titleinput.placeholder = "Title"
    return titleinput;
}

function formDescription(){
    const descriptioninput = document.createElement("input");
    descriptioninput.type = "text";
    descriptioninput.placeholder = "Description"
    return descriptioninput;
}

function formDueDate(){
    const dueDateinput = document.createElement("input");
    dueDateinput.type = "date";
    dueDateinput.placeholder = "Due date";
    return dueDateinput;
}

function formPriority(){
    const priorityinput = document.createElement("input");
    priorityinput.type = "number";
    priorityinput.placeholder = "priority";
    return priorityinput;
}

function formSubmit(form, project, titleinput, descriptioninput, dueDateinput, priorityinput){
    const submit = document.createElement("button");
    submit.innerText = "Add";
    submit.addEventListener("click", (e) => {
        form.remove(); 
        const newToDo = new ToDoCard(titleinput.value, descriptioninput.value, dueDateinput.value, priorityinput.value);
        project.add(newToDo);
        project.showAllCards();
        renderNewCard(newToDo);
        e.preventDefault();   
    });
    return submit;
}

function formCancel(form){
    const cancel = document.createElement("button");
    cancel.innerText = "Cancel";
    cancel.addEventListener("click", (e) => {
        e.preventDefault();  
        form.remove();
    })
    return cancel;
}

function fillNewCard(project){
    addCard.addEventListener("click", () => {
        const form = document.createElement("form");
        form.id = "cardForm";
        const titleinput = formTitle();
        const descriptioninput = formDescription();
        const dueDateinput = formDueDate();
        const priorityinput = formPriority(); 
        const submit = formSubmit(form, project, titleinput, descriptioninput, dueDateinput, priorityinput);
        const cancel = formCancel(form);
        form.appendChild(titleinput);
        form.appendChild(descriptioninput);    
        form.appendChild(dueDateinput);
        form.appendChild(priorityinput);
        form.appendChild(submit);
        form.appendChild(cancel);
        content.appendChild(form); 
    })
}

function renderNewCard(card){
    const toDo = document.createElement("div");
    toDo.classList.add("toDocard");
    const title1 = document.createElement("div");
    title1.textContent = `${card.title}`;
    const description1 = document.createElement("div");
    description1.textContent = `${card.description}`;
    const dueDate1 = document.createElement("div");
    dueDate1.textContent = `${card.dueDate}`;
    const priority1 = document.createElement("div");
    priority1.textContent = `${card.priority}`;
    toDo.appendChild(title1);
    toDo.appendChild(description1);
    toDo.appendChild(dueDate1);
    toDo.appendChild(priority1);
    content.appendChild(toDo);
}

export {fillNewCard, renderNewCard}