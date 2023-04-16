import './style.css';

const content = document.querySelector(".todos");
const sidebar = document.querySelector(".sidebar");
const addCard = document.querySelector("button.addCard");
const addProject = document.querySelector("button.addProject");

class ToDoCard {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}


function fillNewCard(project){
    addCard.addEventListener("click", () => {
        const form = document.createElement("form");
        form.id = "cardForm";
        const titlelabel = document.createElement("label");
        titlelabel.textContent = "Title";
        const titleinput = document.createElement("input");
        titleinput.type = "text";
            
        const descriptionlabel = document.createElement("label");
        descriptionlabel.textContent = "Description";
        const descriptioninput = document.createElement("input");
        descriptioninput.type = "text";
            
        const dueDatelabel = document.createElement("label");
        dueDatelabel.textContent = "Due date";
        const dueDateinput = document.createElement("input");
        dueDateinput.type = "date";
               
        const prioritylabel = document.createElement("label");
        prioritylabel.textContent = "Priority";
        const priorityinput = document.createElement("input");
        priorityinput.type = "number";
            
        const submit = document.createElement("button");
        submit.innerText = "Add";
            
        form.appendChild(titlelabel);
        form.appendChild(titleinput);
        form.appendChild(descriptionlabel);
        form.appendChild(descriptioninput);    
        form.appendChild(dueDatelabel);
        form.appendChild(dueDateinput);
        form.appendChild(prioritylabel);
        form.appendChild(priorityinput);
        form.appendChild(submit);
        content.appendChild(form);
        submit.addEventListener("click", (e) => {
            form.remove(); 
            const newToDo = new ToDoCard(titleinput.value, descriptioninput.value, dueDateinput.value, priorityinput.value);
            project.add(newToDo);
            project.showAllCards();
            renderNewCard(newToDo);
                 
            e.preventDefault();   
        });
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


class ProjectLogic {
    
    constructor(name) {
        this.toDoList = [];
        this.name = name;
    }

    add(card){
        this.toDoList.push(card);
    }

    showAllCards(){
        this.toDoList.forEach(card => {
            console.log(card);
        });
    }

    renderAllCards(){
        this.toDoList.forEach(card => {
            renderNewCard(card);
        });
    }
}

function createNewProject(){
    addProject.addEventListener("click", () => {
        const formProject = document.createElement("form");
        formProject.id = "projectForm";
        const titlelabel = document.createElement("label");
        titlelabel.textContent = "Name";
        const titleinput = document.createElement("input");
        titleinput.type = "text";
        const submit = document.createElement("button");
        submit.innerText = "Add";
        formProject.appendChild(titlelabel);
        formProject.appendChild(titleinput);
        formProject.appendChild(submit);
        sidebar.appendChild(formProject);
        submit.addEventListener("click", (e) => {
            const newProjectL = new ProjectLogic(titleinput.value);
            renderProject(newProjectL);
            formProject.remove();  
            e.preventDefault();   
        });
    })
}
    
function renderProject(project){
    const newproject = document.createElement("div");
    newproject.classList.add("project");
    newproject.textContent = project.name;
    sidebar.appendChild(newproject);
    newproject.addEventListener("click", () => {
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
        console.log(project)
        project.renderAllCards();
        const allprojects = new ListofProjects;
        allprojects.add(project);
        fillNewCard(project);
    });
}

    
class ListofProjects {
    
    constructor(projects) {
        this.projects = [];
    }

    add(project){
        this.projects.push(project);
    }

    showAllProjects(){
        this.projects.forEach(card => {
            console.log(card);
        });
    }
}

const DefaultProject = new ProjectLogic("default");

renderProject(DefaultProject);

createNewProject();


