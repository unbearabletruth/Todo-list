import { CurrentProject } from ".";
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
