import { ToDoCard } from "./classes";

const addCard = document.querySelector("button.addCard");
const content = document.querySelector(".todos");


function formTitle(){
    const titleinput = document.createElement("input");
    titleinput.type = "text";
    titleinput.placeholder = "Title";
    return titleinput;
}

function formDescription(){
    const descriptioninput = document.createElement("textarea");
    descriptioninput.placeholder = "Description";
    descriptioninput.id = "descriptioninput";
    return descriptioninput;
}

function formDueDate(){
    const dueDateinput = document.createElement("input");
    dueDateinput.type = "datetime-local";
    dueDateinput.placeholder = "Due date";
    dueDateinput.pattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}";
    return dueDateinput;
}

function formPriority(){
    const priorityinput = document.createElement("select");
    const options = ["Low", "Medium", "High"];
    const optionInfo = document.createElement("option");
    optionInfo.value = "";
    optionInfo.text = "Choose priority";
    priorityinput.appendChild(optionInfo);
    options.forEach(element => {
        const option = document.createElement("option");
        option.value = element;
        option.text = element;
        priorityinput.appendChild(option);
    });
    return priorityinput;
}

function formSubmit(form, project, titleinput, descriptioninput, dueDateinput, priorityinput){
    const submit = document.createElement("button");
    submit.classList.add("cardformbutton")
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
    cancel.classList.add("cardformbutton")
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
        const buttons = document.createElement("div");
        buttons.classList.add("cardformbutton")
        const submit = formSubmit(form, project, titleinput, descriptioninput, dueDateinput, priorityinput);
        const cancel = formCancel(form);
        form.appendChild(titleinput);
        form.appendChild(descriptioninput);    
        form.appendChild(dueDateinput);
        form.appendChild(priorityinput);
        buttons.appendChild(submit);
        buttons.appendChild(cancel);
        form.appendChild(buttons);
        content.appendChild(form); 
    })
}

function renderNewCard(card){
    const toDo = document.createElement("div");
    toDo.classList.add("toDocard");
    const title1 = document.createElement("p");
    title1.textContent = `Task: ${card.title}`;
    const description1 = document.createElement("p");
    description1.textContent = `Description: ${card.description}`;
    const dueDate1 = document.createElement("p");
    dueDate1.textContent = `Due: ${card.dueDate}`;
    const priority1 = document.createElement("p");
    priority1.textContent = `Priority: ${card.priority}`;
    toDo.appendChild(title1);
    toDo.appendChild(description1);
    toDo.appendChild(dueDate1);
    toDo.appendChild(priority1);
    content.appendChild(toDo);
}

export {fillNewCard, renderNewCard}