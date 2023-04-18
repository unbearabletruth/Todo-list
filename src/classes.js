import { renderNewCard } from "./cardDom";

class ToDoCard {
    constructor(title, description, dueDate, priority, uniqueID) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.uniqueID = uniqueID;
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

    remove(card){
        console.log(card)
        this.toDoList = this.toDoList.filter(item => item.uniqueID !== card.uniqueID);
        console.log(this.toDoList);
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

const allprojects = new ListofProjects;

export {ToDoCard, ProjectLogic, ListofProjects, allprojects};