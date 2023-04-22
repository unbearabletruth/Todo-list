import { CurrentProject } from ".";
import './renderCard.css';
import { ToDoCard } from "./classes";
import { projectNumberofCards } from "./projectDom";
import { format, parseISO } from 'date-fns';
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
    title.id = "renderedTitle";
    title.textContent = `${card.title.charAt(0).toUpperCase() + card.title.slice(1)}`;
    return title;
}

function renderDescription(card){
    const description = document.createElement("div");
    description.id = "renderedDescription";
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
    const dueDate = document.createElement("div");
    dueDate.id = "renderedDueDate";
    const title = document.createElement("p");
    title.classList.add("renderedCardHead");
    title.textContent = "Due date";
    const text = document.createElement("p");
    text.classList.add("renderedCardText");
    if (card.dueDate !== ""){
        const formatDate = format(parseISO(card.dueDate), 'dd MMM yy HH:mm')//how to change date placeholder
        text.textContent = `${formatDate}`;
    }else {
        text.textContent = `${card.dueDate}`;
    }
    dueDate.appendChild(title);
    dueDate.appendChild(text);
    return dueDate;
}

function renderPriority(card){
    const priority = document.createElement("div");
    priority.id = "renderedPriority";
    const title = document.createElement("p");
    title.classList.add("renderedCardHead");
    title.textContent = "Priority";
    const text = document.createElement("p");
    text.classList.add("renderedCardText");
    text.textContent = `${card.priority}`;
    priority.appendChild(title);
    priority.appendChild(text);
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
    toggleCard(toDo);
}

function toggleCard(card){
    card.addEventListener("click", () => {
        card.className = card.className === "toDocard" ? "bigToDoCard" : "toDocard";
    })   
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
    //const cancel = formCancel(form); //make it undo changes instead
    form.appendChild(titleinput);
    form.appendChild(descriptioninput);    
    form.appendChild(dueDateinput);
    form.appendChild(priorityinput);
    buttons.appendChild(submit);
    //buttons.appendChild(cancel);
    form.appendChild(buttons);
    content.insertBefore(form, content.children[index]);
}

function removeCard(card){
    CurrentProject.remove(card);
}

function renderWelcomeCard(){
    const uniqueID = 'id' + (new Date()).getTime();
    const title = "Welcome";
    const description = "This is a welcoming card! Just click the bin icon below to delete it!";
    const dueDate = "2018-06-07T00:00";
    const priority = "Low";
    const newToDo = new ToDoCard(title, description, dueDate, priority, uniqueID);
    CurrentProject.add(newToDo);
    projectNumberofCards(CurrentProject);
    renderCard(newToDo);
}



export {fillNewCard, renderCard, editCard, removeCard, renderWelcomeCard}
