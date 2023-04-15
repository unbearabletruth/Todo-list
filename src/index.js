import './style.css';

const content = document.querySelector(".todos");
const add = document.querySelector("button.add");



//class of todo inner logic
//class of todo dom render
//class of project
class ToDoCard {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class ToDoInterface {
   
    fillNewCard(){
        add.addEventListener("click", () => {
            const form = document.createElement("form");
            
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
                const firsttodo = new ToDoCard(titleinput.value, descriptioninput.value, dueDateinput.value, priorityinput.value);
                const DefaultProject = new ProjectLogic();
                DefaultProject.add(firsttodo);
                this.renderNewCard(firsttodo);
                form.remove();  
                e.preventDefault();   
            });
        })
    }

    renderNewCard(card){
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
}

class ProjectLogic {
    
    constructor(toDoList) {
        this.toDoList = [];
    }

    add(card){
        this.toDoList.push(card);
    }
}

class ProjectInterface {
    
}

class ListofProjects {
    
    constructor(projects) {
        this.projects = [];
    }

    add(project){
        this.projects.push(project);
    }
}

const hello =  new ToDoInterface;
hello.fillNewCard();