import bin from "./bin.svg";
import edit from "./edit.svg";
import { CurrentProject } from ".";
import { renderCard, editCard, removeCard } from "./cardDom";
import { ToDoCard } from "./classes";
import { projectNumberofCards } from "./projectDom";
import { addCardToProjectStorage } from "./storage";

export function formForm(titleinput, descriptioninput, dueDateinput, priorityinput){
    const form = document.createElement("form");
    form.id = "cardForm";
    form.addEventListener("submit", (e) => {
        form.remove();
        const uniqueID = 'id' + (new Date()).getTime();
        const newToDo = new ToDoCard(titleinput.value, descriptioninput.value, dueDateinput.value, priorityinput.value, uniqueID);
        console.log(CurrentProject);
        CurrentProject.add(newToDo);
        addCardToProjectStorage(CurrentProject, newToDo);
        console.log(CurrentProject.getLength())
        projectNumberofCards(CurrentProject);//
        
        CurrentProject.showAllCards();
        renderCard(newToDo);
        e.preventDefault();   
    });
    return form;
}

export function formFormEdit(card, titleinput, descriptioninput, dueDateinput, priorityinput, index){
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

export function formTitle(){
    const titleinput = document.createElement("input");
    titleinput.type = "text";
    titleinput.placeholder = "Title";
    titleinput.required = true;
    titleinput.maxLength = 20;
    return titleinput;
}

export function formDescription(){
    const descriptioninput = document.createElement("textarea");
    descriptioninput.placeholder = "Description";
    descriptioninput.id = "descriptioninput";
    descriptioninput.maxLength = 100;
    return descriptioninput;
}

export function formDueDate(){
    const dueDateinput = document.createElement("input");
    dueDateinput.type = "datetime-local";
    dueDateinput.placeholder = "Due date";
    dueDateinput.pattern = "[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}";
    return dueDateinput;
}

export function formPriority(){
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

export function formSubmit(){
    const submit = document.createElement("button");
    submit.classList.add("cardformbutton")
    submit.innerText = "Add"; 
    return submit;
}

export function formSubmitEdit(){
    const submit = document.createElement("button");
    submit.classList.add("cardformbutton")
    submit.innerText = "Change"; 
    return submit;
}

export function formCancel(form){
    const cancel = document.createElement("button");
    cancel.classList.add("cardformbutton")
    cancel.innerText = "Cancel";
    cancel.addEventListener("click", (e) => {
        e.preventDefault();  
        form.remove();
    })
    return cancel;
}

export function deleteBin(card, toDo){
    const deleteIcon = document.createElement("img");
    deleteIcon.classList.add("cardimg");
    deleteIcon.src = bin;
    deleteIcon.addEventListener("click", () => {
        removeCard(card);
        projectNumberofCards(CurrentProject);
        //CurrentProject.remove(card); mb do it directly
        toDo.remove();
    })
    return deleteIcon;
}

export function editCardIcon(card, toDo){  
    const editIcon = document.createElement("img");
    editIcon.classList.add("cardimg");
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
