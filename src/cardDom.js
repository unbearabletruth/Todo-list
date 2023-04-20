import { CurrentProject } from ".";
import './renderCard.css';
import { formCancel, formDescription, formDueDate, formForm, formFormEdit, 
    formPriority, formSubmit, formTitle, deleteBin, editCardIcon, formSubmitEdit} from './cardFormElements'


const content = document.querySelector(".todos");

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

function renderTitle(card){
    const title = document.createElement("p");
    title.classList.add("renderedCard");
    title.textContent = `Task: ${card.title}`;
    return title;
}

function renderDescription(card){
    const description = document.createElement("div");
    description.classList.add("renderedCard");
    const title = document.createElement("p");
    title.classList.add("renderedCardHead");
    title.textContent = "Description";
    const text = document.createElement("p");
    text.classList.add("renderedCardText");
    text.textContent = `${card.description}`;
    description.appendChild(title);
    description.appendChild(text);
    return description;
}

function renderDueDate(card){
    const dueDate = document.createElement("p");
    dueDate.classList.add("renderedCard");
    dueDate.textContent = `Due: ${card.dueDate}`;
    return dueDate;
}

function renderPriority(card){
    const priority = document.createElement("p");
    priority.classList.add("renderedCard");
    priority.textContent = `Priority: ${card.priority}`;
    return priority;
}

function renderCard(card, index){
    const toDo = document.createElement("div");
    toDo.id = card.uniqueID;
    toDo.classList.add("toDocard");
    const title = renderTitle(card);
    const description = renderDescription(card);
    const dueDate = renderDueDate(card);
    const priority = renderPriority(card);
    toDo.appendChild(title);
    toDo.appendChild(description);
    toDo.appendChild(dueDate);
    toDo.appendChild(priority);
    content.insertBefore(toDo, content.children[index]);
    priorityCardColor(toDo, card.priority);
    const icons = document.createElement("div");
    icons.id = "cardIcons";
    const editIcon = editCardIcon(card, toDo);
    const deleteIcon = deleteBin(card, toDo);
    icons.appendChild(editIcon);
    icons.appendChild(deleteIcon);
    toDo.appendChild(icons);
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
    const submit = formSubmitEdit();
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

export {fillNewCard, renderCard, editCard, removeCard}
