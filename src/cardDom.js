import { ToDoCard, ProjectLogic } from "./classes";
import { CurrentProject } from ".";
import bin from "./bin.svg";
import edit from "./edit.svg";


const content = document.querySelector(".todos");


function formTitle(){
    const titleinput = document.createElement("input");
    titleinput.type = "text";
    titleinput.placeholder = "Title";
    titleinput.required = true;
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

function formSubmit(){
    const submit = document.createElement("button");
    submit.classList.add("cardformbutton")
    submit.innerText = "Add"; 
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

function formForm(titleinput, descriptioninput, dueDateinput, priorityinput){
    const form = document.createElement("form");
    form.id = "cardForm";
    form.addEventListener("submit", (e) => {
        form.remove();
        const uniqueID = 'id' + (new Date()).getTime();
        const newToDo = new ToDoCard(titleinput.value, descriptioninput.value, dueDateinput.value, priorityinput.value, uniqueID);
        console.log(CurrentProject);
        CurrentProject.add(newToDo);
        CurrentProject.showAllCards();
        renderCard(newToDo);
        e.preventDefault();   
    });
    return form;
}

function formFormEdit(card, titleinput, descriptioninput, dueDateinput, priorityinput, index){
    const form = document.createElement("form");
    form.id = "cardForm";
    form.addEventListener("submit", (e) => {
        form.remove();
        console.log(CurrentProject);
        CurrentProject.edit(card, titleinput.value, descriptioninput.value, dueDateinput.value, priorityinput.value);
        CurrentProject.showAllCards();
        renderCard(card, index);
        e.preventDefault();   
    });
    return form;
}

function fillNewCard(){
    const addCard = document.querySelector("button.addCard");
    addCard.addEventListener("click", () => {
        const titleinput = formTitle();
        const descriptioninput = formDescription();
        const dueDateinput = formDueDate();
        const priorityinput = formPriority();
        const form = formForm(titleinput, descriptioninput, dueDateinput, priorityinput);
        const buttons = document.createElement("div");
        buttons.classList.add("cardformbutton");
        const submit = formSubmit();
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

function deleteBin(card, toDo){
    const deleteIcon = document.createElement("img");
    deleteIcon.src = bin;
    deleteIcon.addEventListener("click", () => {
        removeCard(card);
        toDo.remove();
    })
    return deleteIcon;
}

function editCardIcon(card, toDo){  
    const editIcon = document.createElement("img");
    editIcon.src = edit;
    editIcon.addEventListener("click", () => {
        console.log(card.uniqueID)
        const child = document.getElementById(card.uniqueID);
        const index = Array.from(child.parentElement.children).indexOf(child);
        console.log(index);
        toDo.remove();
        editCard(card, index);
    })
    return editIcon;
}

function priorityCardColor(toDo, priority){
    if (priority === "High"){
        toDo.style.backgroundColor = "#fca5a5";
    }
    else if (priority === "Medium"){
        toDo.style.backgroundColor = "#fdba74";
    }
    else if (priority === "Low"){
        toDo.style.backgroundColor = "#fcd34d";
    }
}

function renderCard(card, index){
    const toDo = document.createElement("div");
    toDo.id = card.uniqueID;
    toDo.classList.add("toDocard");
    const title1 = document.createElement("p");
    title1.textContent = `Task: ${card.title}`;
    const description1 = document.createElement("p");
    description1.textContent = `Description: ${card.description}`;
    const dueDate1 = document.createElement("p");
    dueDate1.textContent = `Due: ${card.dueDate}`;
    const priority1 = document.createElement("p");
    priority1.textContent = `Priority: ${card.priority}`;
    const deleteIcon = deleteBin(card, toDo);
    toDo.appendChild(title1);
    toDo.appendChild(description1);
    toDo.appendChild(dueDate1);
    toDo.appendChild(priority1);
    toDo.appendChild(deleteIcon);
    content.insertBefore(toDo, content.children[index]);
    priorityCardColor(toDo, card.priority);
    const editIcon = editCardIcon(card, toDo);
    toDo.appendChild(editIcon);
}

function editCard(card, index){
    const titleinput = formTitle();
    console.log(index)
    titleinput.value = card.title;
    const descriptioninput = formDescription();
    descriptioninput.value = card.description;
    const dueDateinput = formDueDate();
    dueDateinput.value = card.dueDate;
    const priorityinput = formPriority();
    priorityinput.value = card.priority;
    const form = formFormEdit(card, titleinput, descriptioninput, dueDateinput, priorityinput, index);
    const buttons = document.createElement("div");
    buttons.classList.add("cardformbutton");
    const submit = formSubmit();
    const cancel = formCancel(form);
    form.appendChild(titleinput);
    form.appendChild(descriptioninput);    
    form.appendChild(dueDateinput);
    form.appendChild(priorityinput);
    buttons.appendChild(submit);
    buttons.appendChild(cancel);
    form.appendChild(buttons);
    content.insertBefore(form, content.children[index]);
}

function removeCard(card){
    CurrentProject.remove(card);
}

export {fillNewCard, renderCard}
