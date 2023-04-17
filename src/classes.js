import { renderNewCard } from "./cardDom";

class ToDoCard {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
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

export {ToDoCard, ProjectLogic, ListofProjects};