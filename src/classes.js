import { renderCard } from "./cardDom";

class ToDoCard {
    constructor(title, description, dueDate, priority, uniqueID, projectID) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.uniqueID = uniqueID;
        this.projectID = projectID;
    }

    static fromJSON(serializedJson) {
        return Object.assign(new ToDoCard(), JSON.parse(serializedJson))
    }
}


class ProjectLogic {
    
    constructor(name, index) {
        this.toDoList = [];
        this.name = name;
        this.index = index;
    }

    add(card){
        this.toDoList.push(card);
    }

    remove(card){
        console.log(card)
        this.toDoList = this.toDoList.filter(item => item.uniqueID !== card.uniqueID);
        console.log(this.toDoList);
    }

    edit(card, titleinput, descriptioninput, dueDateinput, priorityinput){
        console.log(titleinput)
        for (let task of this.toDoList){
            if (card.uniqueID === task.uniqueID){
                task.title = titleinput;
                task.description = descriptioninput;
                task.dueDate = dueDateinput;
                task.priority = priorityinput;
            }
        }
    }

    getLength(){
        let len = this.toDoList.length;
        return len;
    }

    getAllCards(){
        return this.toDoList;
    }

    showAllCards(){
        this.toDoList.forEach(card => {
            console.log(card);
        });
    }

    renderAllCards(){
        this.toDoList.forEach(card => {
            renderCard(card);
        });
    }

    static fromJSON(serializedJson) {
        return Object.assign(new ProjectLogic(), serializedJson)
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

    getAllProjects(){
        return this.projects;
    }
}

const allprojects = new ListofProjects;

export {ToDoCard, ProjectLogic, ListofProjects, allprojects};